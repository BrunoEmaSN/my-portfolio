import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { ANIMATION_CONFIG } from "../../constants";

const MainTitle = ({ isMobile = false, text = "PRESS ANY BUTTON" }) => {
  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current || !fillRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      defaults: { ease: "expo.inOut" }
    });

    gsap.fromTo(titleWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power1.out" });

    tl.fromTo(
      fillRef.current,
      { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
      { 
        clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)", 
        duration: 1.2 
      }
    )
    .to(fillRef.current, {
        clipPath: "polygon(110% 0%, 110% 0%, 100% 100%, 100% 100%)",
        duration: ANIMATION_CONFIG.fast,
        delay: 0.5
    });
  }, { scope: containerRef, dependencies: [titleWrapperRef] });

  const textStyle = clsx("flex flex-col leading-[0.85] font-black uppercase", isMobile ? 'text-4xl sm:text-7xl md:text-[100px]' : 'text-[200px]');

  return (
    <div ref={titleWrapperRef} className="flex gap-4 opacity-0">
        <div className="bg-blue-700 w-8 sm:w-10 md:w-15 lg:w-20" />
        <div ref={containerRef} className="relative inline-block select-none">
        <div 
            className={clsx(textStyle, "text-transparent pb-1 font-m-plus-1p pr-1")}
            style={{ WebkitTextStroke: "3px white", letterSpacing: "-0.09em" }}
        >
            {words.map((word, i) => (
            <span key={`out-${i}`}>{word}</span>
            ))}
        </div>

        <div 
            ref={fillRef}
            className={clsx(textStyle, "absolute inset-0 text-white font-m-plus-1p")}
            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", letterSpacing: "-0.09em" }}
        >
            {words.map((word, i) => (
            <span key={`fill-${i}`}>{word}</span>
            ))}
        </div>
        </div>
    </div>
  );
};

export default MainTitle;