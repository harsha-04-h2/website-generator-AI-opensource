"use client";

export default function HomeHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cinematic Noise Base */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Soft Glow Gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-[120px] animate-pulse duration-[8s]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-tl from-orange-600/5 to-transparent rounded-full blur-[100px] animate-pulse duration-[10s]" />
      
      {/* Atmospheric Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80" />
      
      {/* Floating Particles (Subtle) */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-orange-500/20 rounded-full animate-ping duration-[4s]" />
        <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 bg-orange-400/10 rounded-full animate-ping duration-[6s] delay-1000" />
        <div className="absolute bottom-[30%] left-[40%] w-1 h-1 bg-orange-300/15 rounded-full animate-ping duration-[5s] delay-2000" />
      </div>

      {/* Premium Texture Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-black-alpha-4 via-transparent to-transparent" />
    </div>
  );
}
