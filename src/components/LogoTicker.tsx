"use client";

import Image from "next/image";

interface LogoTickerProps {
  logos: { src: string; alt: string }[];
}

export default function LogoTicker({ logos }: LogoTickerProps) {
  // Double the logos for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-light-bg/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-light-bg/40 to-transparent z-10 pointer-events-none" />
      <div className="flex items-center gap-12 animate-ticker">
        {doubled.map((logo, i) => (
          <Image
            key={`${logo.src}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={60}
            className="h-10 md:h-12 w-auto shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}
