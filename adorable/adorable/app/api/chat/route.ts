import { type UIMessage } from "ai";
import { cookies } from "next/headers";
import { freestyle } from "freestyle-sandboxes";

import { createTools as createVmTools } from "@/lib/create-tools";
import { streamLlmResponse } from "@/lib/llm-provider";
import { adorableVmSpec } from "@/lib/adorable-vm";
import { getOrCreateIdentitySession } from "@/lib/identity-session";
import {
  readRepoMetadata,
  saveConversationMessages,
} from "@/lib/repo-storage";

import { SYSTEM_PROMPT } from "@/lib/system-prompt";

const CREATIVE_DIRECTION_SYSTEM = `
CREATIVE DIRECTION ENGINE:
You are an AI Creative Director. For every request, you must:
1. Detect Website Type
2. Identify Brand Archetype
3. Select Style DNA (e.g., Editorial Luxury, Brutalist Tech, Cinematic Fashion)
4. Assemble Creative Direction
5. Plan Sections with Intelligence

VISUAL LANGUAGE:
- Oversized typography & premium pairings
- Asymmetrical layouts & broken grids
- Cinematic whitespace & visual tension
- Immersive visual hierarchy
- Modular editorial sections
- Layered storytelling depth

MOTION SYSTEM:
- Restrained, cinematic, and expensive feel
- Smooth parallax & layered reveals
- Physicality & emotional timing
- Opacity choreography & premium hover timing
- Cinematic scrolling & smooth scaling

AVOID:
- Generic SaaS UI & repetitive card grids
- Dashboard aesthetics & startup-style cards
- Centered hero sections everywhere
- Excessive gradients & AI clichés
- Utility-first looking layouts

BIGGEST PRIORITY:
Taste consistency across the entire experience. Every element must feel emotionally intentional and premium.
`;

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as {
      messages?: UIMessage[];
      repoId?: string;
      conversationId?: string;
    };

    const { repoId, conversationId } = payload;

    const messages = Array.isArray(payload.messages)
      ? payload.messages
      : undefined;

    if (!repoId || !conversationId) {
      return Response.json(
        { error: "repoId and conversationId are required." },
        { status: 400 }
      );
    }

    if (!messages) {
      return Response.json(
        { error: "messages must be an array." },
        { status: 400 }
      );
    }

    const { identity } = await getOrCreateIdentitySession();

    const { repositories } =
      await identity.permissions.git.list({
        limit: 200,
      });

    const hasAccess = repositories.some(
      (repo) => repo.id === repoId
    );

    if (!hasAccess) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const metadata = await readRepoMetadata(repoId);

    if (!metadata) {
      return Response.json(
        { error: "Repository metadata not found." },
        { status: 404 }
      );
    }

    await saveConversationMessages(
      repoId,
      metadata,
      conversationId,
      messages
    );

    const vm = freestyle.vms.ref({
      vmId: metadata.vm.vmId,
      spec: adorableVmSpec,
    });

    const tools = createVmTools(vm, {
      sourceRepoId: metadata.sourceRepoId,
      metadataRepoId: repoId,
    });

    const cookieStore = await cookies();

    const userApiKey =
      cookieStore.get("user-api-key")?.value;

    const userProvider =
      cookieStore.get("user-api-provider")?.value;

    const hasGlobalKey = Boolean(
      process.env.OPENAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY
    );

    if (!hasGlobalKey && !userApiKey) {
      return Response.json(
        {
          error:
            "No API key configured. Please add your API key in settings.",
        },
        { status: 401 }
      );
    }

    const enhancedSystemPrompt = `
${SYSTEM_PROMPT}

${CREATIVE_DIRECTION_SYSTEM}
`;

    const llm = await streamLlmResponse({
      system: enhancedSystemPrompt,
      messages,
      tools,

      ...(hasGlobalKey
        ? {}
        : {
            apiKey: userApiKey,
            providerOverride: userProvider,
          }),
    });

    return llm.result.toUIMessageStreamResponse({
      sendReasoning: true,
      originalMessages: messages,

      generateMessageId: () => {
        return crypto.randomUUID();
      },

      onFinish: async ({ messages: finalMessages }) => {
        const latestMetadata =
          await readRepoMetadata(repoId);

        if (!latestMetadata) return;

        await saveConversationMessages(
          repoId,
          latestMetadata,
          conversationId,
          finalMessages
        );
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}