import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({ children, className }) => {
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;

    if (!element) return;

    gsap.set(element, { opacity: 0, y: 50 });

    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, []);

  return (
    <div ref={revealRef} className={`will-change-reveal ${className || ""}`}>
      {children}
    </div>
  );
};
