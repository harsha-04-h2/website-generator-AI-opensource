import Link from "next/link";

export default function HomeHeroBadge() {
  return (
    <div
      className="px-12 py-4 rounded-full flex w-max mx-auto mb-12 lg:mb-16 items-center relative border border-black-alpha-8 bg-white/40 backdrop-blur-sm shadow-sm"
    >
      <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-black-alpha-40 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-orange-600 animate-pulse" />
        AI Creative Operating System
      </div>
    </div>
  );
}
