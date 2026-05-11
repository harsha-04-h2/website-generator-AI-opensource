"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRepos } from "@/lib/repos-context";
import type { RepoItem } from "@/lib/repo-types";
import { SUGGESTIONS } from "@/lib/suggestions";
import { type FC } from "react";
import { SparklesIcon } from "lucide-react";

function getPreviewUrl(repo: RepoItem): string | null {
  // prefer production domain
  if (repo.productionDomain) {
    return `https://${repo.productionDomain}`;
  }
  // fall back to live deployment url
  const live = repo.deployments.find((d) => d.state === "live");
  if (live?.url) return live.url;
  // fall back to vm preview
  if (repo.vm?.previewUrl) return repo.vm.previewUrl;
  return null;
}

export const HomeWelcome: FC = () => {
  const { repos, isLoading, onSelectProject } = useRepos();

  const hasProjects = repos.length > 0;
  const showProjects = isLoading || hasProjects;

  return (
    <div className="aui-thread-welcome-root mx-auto flex w-full max-w-(--thread-max-width) grow flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-12 px-2">
        {/* Hero */}
        <div className="flex animate-in flex-col items-center gap-4 pt-12 text-center duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 ring-1 ring-foreground/10">
            <SparklesIcon className="h-8 w-8 text-foreground/80" />
            <div className="absolute inset-0 animate-pulse rounded-full bg-foreground/5" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Describe your vision
          </h1>
          <p className="max-w-[460px] text-base text-muted-foreground/60 md:text-lg">
            Our AI creative director will transform your direction into a cinematic, premium digital experience.
          </p>
        </div>

        {/* Style DNA Suggestions */}
        <div className="grid animate-in grid-cols-1 gap-4 duration-700 fill-mode-both fade-in slide-in-from-bottom-8 sm:grid-cols-2 md:grid-cols-3">
          {SUGGESTIONS.slice(0, 6).map((suggestion, index) => (
            <button
              key={suggestion.title}
              type="button"
              onClick={() => {
                const composerInput = document.querySelector(
                  ".aui-composer-input",
                ) as HTMLTextAreaElement;
                if (composerInput) {
                  composerInput.value = suggestion.prompt;
                  composerInput.focus();
                  // Trigger input event to resize textarea and update state
                  composerInput.dispatchEvent(new Event("input", { bubbles: true }));
                }
              }}
              className="group relative flex flex-col items-start gap-2 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-5 text-left transition-all duration-300 hover:border-foreground/10 hover:bg-foreground/[0.04] hover:shadow-2xl hover:shadow-foreground/5"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">
                {suggestion.title}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground/60 group-hover:text-muted-foreground/80">
                {suggestion.label}
              </span>
              <div className="absolute right-4 bottom-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <SparklesIcon className="h-3 w-3 text-foreground/40" />
              </div>
            </button>
          ))}
        </div>

        {/* Recent Projects */}
        {showProjects && (
          <div
            className={cn(
              "mt-8 flex w-full flex-col gap-6 transition-all duration-1000",
              showProjects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground/40">
                Recent Visions
              </h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-foreground/5 bg-foreground/[0.02]"
                  >
                    <Skeleton className="aspect-video w-full" />
                    <div className="px-4 py-3">
                      <Skeleton className="mb-2 h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {repos.map((repo, index) => {
                  const previewUrl = getPreviewUrl(repo);
                  return (
                    <button
                      key={repo.id}
                      type="button"
                      onClick={() => onSelectProject(repo.id)}
                      className="group animate-in overflow-hidden rounded-2xl border border-foreground/5 bg-foreground/[0.02] text-left transition-all duration-300 fill-mode-both fade-in hover:border-foreground/20 hover:bg-foreground/[0.04] hover:shadow-xl hover:shadow-foreground/5"
                      style={{
                        animationDelay: `${index * 75}ms`,
                      }}
                    >
                      {/* Preview thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
                        {previewUrl ? (
                          <iframe
                            src={previewUrl}
                            title={`${repo.name} preview`}
                            className="pointer-events-none absolute inset-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 transition-transform duration-500 group-hover:scale-[0.52]"
                            tabIndex={-1}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground/20">
                              Preview pending
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      {/* Info */}
                      <div className="px-4 py-3">
                        <p className="truncate text-sm font-medium text-foreground/80 group-hover:text-foreground">
                          {repo.name}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground/40 group-hover:text-muted-foreground/60">
                          {repo.conversations.length} iteration
                          {repo.conversations.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
