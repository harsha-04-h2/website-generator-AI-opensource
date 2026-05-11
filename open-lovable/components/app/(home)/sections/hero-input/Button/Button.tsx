import { AnimatePresence, motion } from "motion/react";

import AnimatedWidth from "@/components/shared/layout/animated-width";
import ArrowRight from "@/components/app/(home)/sections/hero-input/_svg/ArrowRight";
import Button from "@/components/shared/button/Button";

export default function HeroInputSubmitButton({
  dirty,
  buttonText = "Re-imagine Site",
  disabled = false,
}: {
  dirty: boolean;
  buttonText?: string;
  disabled?: boolean;
}) {
  return (
    <Button 
      className={`hero-input-button !p-0 ${disabled ? 'bg-gray-400 hover:bg-gray-400 cursor-wait' : 'bg-accent-black hover:bg-orange-600'} transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(250,69,0,0.3)]`} 
      size="large" 
      variant="primary"
      disabled={disabled}
    >
      <AnimatedWidth>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
            initial={{ opacity: 0, x: 10, filter: "blur(2px)" }}
            key={dirty ? "dirty" : "clean"}
          >
            {dirty ? (
              <div className="py-8 w-126 text-center text-white">
                {buttonText}
              </div>
            ) : (
              <div className="w-60 py-8 flex-center">
                <ArrowRight />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </AnimatedWidth>
    </Button>
  );
}
