import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({ children, className }) => {
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={revealRef} className={`will-change-transform ${className || ""}`}>
      {children}
    </div>
  );
};
