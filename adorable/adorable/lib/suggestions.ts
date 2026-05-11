/** Premium brand-focused example prompts. */

export type Suggestion = {
  title: string;
  label: string;
  prompt: string;
};

export const SUGGESTIONS: Suggestion[] = [
  // ── Luxury & Editorial ────────────────────────────────────────
  {
    title: "Editorial Luxury",
    label: "High-end fashion boutique",
    prompt: "Create an editorial luxury website for a high-end fashion boutique. Focus on oversized typography, cinematic whitespace, and asymmetrical layouts. Use a minimal color palette with rich textures.",
  },
  {
    title: "Modern Wellness",
    label: "Premium organic skincare",
    prompt: "Design a modern wellness platform for premium organic skincare. Emphasize tactile realism, soft natural lighting, and immersive visual hierarchy. The motion should feel organic and calm.",
  },
  {
    title: "Architectural Minimalism",
    label: "Design studio portfolio",
    prompt: "Build an architectural minimalist portfolio for a design studio. Use broken grid compositions, fullscreen hero sections, and a strong focus on structural form and monochromatic elegance.",
  },
  {
    title: "Cinematic Fashion",
    label: "Seasonal collection reveal",
    prompt: "Generate a cinematic fashion experience for a seasonal collection reveal. Include layered storytelling, smooth parallax reveals, and emotionally timed transitions that feel physical and immersive.",
  },
  {
    title: "Premium Beverage",
    label: "Artisanal distillery brand",
    prompt: "Create a premium beverage site for an artisanal distillery. Focus on dark, moody aesthetics, high-contrast typography, and tactile product sections that feel premium and polished.",
  },

  // ── Creative & Tech ───────────────────────────────────────────
  {
    title: "Brutalist Tech",
    label: "Next-gen software engine",
    prompt: "Design a brutalist tech website for a next-gen software engine. Use raw typography, unconventional layout compositions, and a motion system that feels physical and industrial yet refined.",
  },
  {
    title: "Creative Studio",
    label: "Multi-disciplinary agency",
    prompt: "Build a creative studio site for a multi-disciplinary agency. Focus on visual pacing, immersive hero systems, and a layout that balances broken grids with modular editorial sections.",
  },
  {
    title: "Futuristic Automotive",
    label: "Electric hypercar concept",
    prompt: "Generate a futuristic automotive experience for an electric hypercar concept. Use sleek typography, dramatic lighting, and a motion system with smooth scaling and layered depth.",
  },
  {
    title: "Founder Performance",
    label: "High-performance coaching",
    prompt: "Create a founder performance platform for high-performance coaching. Use bold, oversized headlines, strong visual hierarchy, and an atmosphere that feels emotionally intentional and elite.",
  },
];
