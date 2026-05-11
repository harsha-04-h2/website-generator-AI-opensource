import Link from "next/link";

import { Connector } from "@/components/shared/layout/curvy-rect";
import HeroFlame from "@/components/shared/effects/flame/hero-flame";

import HomeHeroBackground from "./Background/Background";
import { BackgroundOuterPiece } from "./Background/BackgroundOuterPiece";
import HomeHeroBadge from "./Badge/Badge";
import HomeHeroPixi from "./Pixi/Pixi";
import HomeHeroTitle from "./Title/Title";
import HeroInput from "../hero-input/HeroInput";
import HeroScraping from "../hero-scraping/HeroScraping";

export default function HomeHero() {
  return (
    <section className="overflow-x-clip" id="home-hero">
      <div
        className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative"
        id="hero-content"
      >
        <HomeHeroPixi />
        <HeroFlame />

        <BackgroundOuterPiece />

        <HomeHeroBackground />

        <div className="relative container px-16">
          <HomeHeroBadge />
          <HomeHeroTitle />

          <p className="text-center text-body-large max-w-[600px] mx-auto opacity-60">
            Describe your brand. Generate premium digital experiences instantly.
          </p>
        </div>
      </div>

      <div className="container lg:contents !p-16 relative -mt-90">
        <HeroInput />
      </div>
    </section>
  );
}
