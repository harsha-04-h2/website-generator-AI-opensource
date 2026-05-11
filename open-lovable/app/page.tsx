"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { appConfig } from '@/config/app.config';
import { toast } from "sonner";
import { Sparkles as SparklesIcon } from "lucide-react";

// Import shared components
import { HeaderProvider } from "@/components/shared/header/HeaderContext";

// Import hero section components
import HomeHeroBackground from "@/components/app/(home)/sections/hero/Background/Background";
import HomeHeroBadge from "@/components/app/(home)/sections/hero/Badge/Badge";
import HomeHeroTitle from "@/components/app/(home)/sections/hero/Title/Title";
import HeroInputSubmitButton from "@/components/app/(home)/sections/hero-input/Button/Button";

// Import header components
import HeaderBrandKit from "@/components/shared/header/BrandKit/BrandKit";
import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";
import GithubIcon from "@/components/shared/header/Github/_svg/GithubIcon";
import ButtonUI from "@/components/ui/shadcn/button"

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [selectedStyle] = useState<string>("1");
  const [selectedModel] = useState<string>(appConfig.ai.defaultModel);
  const [isSearching] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const inputValue = url.trim();

    if (!inputValue) {
      toast.error("Please describe your website vision");
      return;
    }

    // Direct generation from prompt
    setIsFadingOut(true);
    
    // Wait for fade animation
    setTimeout(() => {
      sessionStorage.setItem('targetUrl', ''); // No URL needed for pure prompt
      sessionStorage.setItem('selectedStyle', selectedStyle);
      sessionStorage.setItem('selectedModel', selectedModel);
      sessionStorage.setItem('autoStart', 'true');
      sessionStorage.setItem('brandExtensionMode', 'true');
      sessionStorage.setItem('brandExtensionPrompt', inputValue);
      router.push('/generation');
    }, 500);
  };

  return (
    <HeaderProvider>
      <div className={`min-h-screen bg-background-base transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header/Navigation Section */}
        <HeaderDropdownWrapper />

        <div className="sticky top-0 left-0 w-full z-[101] bg-background-base/80 backdrop-blur-md header">
          <div className="h-1 bg-border-faint/50 w-full left-0 -bottom-1 absolute" />
          
          <HeaderWrapper>
            <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
              <div className="flex gap-24 items-center">
                <HeaderBrandKit />
              </div>
              <div className="flex gap-8 items-center">
                <nav className="hidden md:flex gap-8 mr-8">
                   <a href="/docs" className="text-sm font-medium text-black-alpha-40 hover:text-accent-black transition-colors">Docs</a>
                   <a href="/pricing" className="text-sm font-medium text-black-alpha-40 hover:text-accent-black transition-colors">Pricing</a>
                </nav>
                <a
                  className="contents"
                  href="https://github.com/mendableai/open-lovable"
                  target="_blank"
                >
                  <ButtonUI variant="tertiary" className="rounded-full border-black-alpha-8 bg-white/50 backdrop-blur-sm">
                    <GithubIcon />
                    Star on GitHub
                  </ButtonUI>
                </a>
              </div>
            </div>
          </HeaderWrapper>
        </div>

        {/* Hero Section */}
        <section className="overflow-x-clip relative min-h-[90vh] flex flex-col justify-center" id="home-hero">
          <HomeHeroBackground />
          
          <div className="pt-28 pb-115 relative z-10" id="hero-content">
            <div className="relative container px-16">
              <HomeHeroBadge />
              <HomeHeroTitle />
              <p className="text-center text-body-large max-w-[600px] mx-auto text-black-alpha-40 mb-12">
                Describe your brand. Generate premium digital experiences instantly.
              </p>
              
              {/* Mini Playground Input */}
              <div className="max-w-640 mx-auto z-[11] lg:z-[2]">
                <div className="rounded-3xl">
                  <div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl relative z-10 transition-all duration-700 hover:shadow-[0_0_50px_rgba(250,69,0,0.15)] group border border-white/20"
                    style={{
                      boxShadow:
                        "0px 0px 44px 0px rgba(0, 0, 0, 0.02), 0px 88px 56px -20px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 0px 0px 12px rgba(249, 249, 249, 0.8)",
                    }}
                  >
                    {/* Animated Border Gradient */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-orange-500 via-orange-600 to-orange-400 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 -z-10 blur-[2px] animate-gradient-x" />

                    <div className="p-[24px] flex gap-16 items-center w-full relative bg-white/40 rounded-3xl">
                      <SparklesIcon className="opacity-40 flex-shrink-0 text-orange-600" size={22} />
                      <input
                        className="flex-1 bg-transparent text-body-input text-accent-black placeholder:text-black-alpha-24 focus:outline-none focus:ring-0 focus:border-transparent text-lg"
                        placeholder="Describe your website vision..."
                        type="text"
                        value={url}
                        disabled={isSearching}
                        onChange={(e) => {
                          setUrl(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isSearching) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isSearching) {
                            handleSubmit();
                          }
                        }}
                        className={isSearching ? 'pointer-events-none' : ''}
                      >
                        <HeroInputSubmitButton 
                          dirty={url.length > 0} 
                          buttonText="Generate" 
                          disabled={isSearching}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HeaderProvider>
  );
}
