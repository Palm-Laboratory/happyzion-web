"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const setScrollVars = (scrollY: number, limit: number, velocity: number) => {
      const progress = limit > 0 ? scrollY / limit : 0;
      const direction = velocity === 0 ? 0 : velocity > 0 ? 1 : -1;

      root.style.setProperty("--scroll-y", `${scrollY.toFixed(3)}px`);
      root.style.setProperty("--scroll-progress", progress.toFixed(5));
      root.style.setProperty("--scroll-velocity", velocity.toFixed(5));
      root.style.setProperty("--scroll-direction", `${direction}`);
      root.style.setProperty("--scroll-limit", `${limit.toFixed(3)}px`);
      root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
    };

    if (mediaQuery.matches) {
      const updateNativeScrollVars = () => {
        const limit = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        setScrollVars(window.scrollY, limit, 0);
      };

      updateNativeScrollVars();
      window.addEventListener("scroll", updateNativeScrollVars, { passive: true });
      window.addEventListener("resize", updateNativeScrollVars);

      return () => {
        window.removeEventListener("scroll", updateNativeScrollVars);
        window.removeEventListener("resize", updateNativeScrollVars);
      };

      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoRaf: false,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      setScrollVars(lenis.scroll, lenis.limit, lenis.velocity);
      frame = window.requestAnimationFrame(raf);
    };

    setScrollVars(0, lenis.limit, 0);
    frame = window.requestAnimationFrame(raf);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
