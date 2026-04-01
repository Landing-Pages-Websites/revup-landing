"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: string;
  duration?: number;
}

export default function CountUp({ end, duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(end);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          // Extract number from string like "100%" -> 100
          const match = end.match(/(\d+)/);
          if (!match) return;
          const target = parseInt(match[1]);
          const prefix = end.slice(0, end.indexOf(match[1]));
          const suffix = end.slice(end.indexOf(match[1]) + match[1].length);

          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{display}</span>;
}
