"use client";

import React, { useRef, useEffect, useCallback } from "react";
import ImageTrail, { ImageTrailItem } from "@/components/ui/image-trail";

interface ContentWithTrailProps {
  children: React.ReactNode;
  images: string[];
}

export default function ContentWithTrail({ children, images }: ContentWithTrailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Apply dissolve glow to the content area
  const applyGlow = useCallback(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current.querySelector("[data-trail-content]") as HTMLElement | null;
    if (!el) return;
    el.style.position = "relative";
    el.style.zIndex = "5";
    el.style.backgroundColor = "#ffffff";
    el.style.boxShadow = "0 0 60px 40px #ffffff";
  }, []);

  useEffect(() => {
    applyGlow();
  }, [applyGlow]);

  if (images.length === 0) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen" ref={wrapperRef}>
      {/* Trail layer */}
      <ImageTrail
        threshold={500}
        intensity={0.2}
        repeatChildren={2}
        baseZIndex={1}
        zIndexDirection="new-on-top"
        excludeSelector="[data-trail-content]"
        keyframes={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.9],
        }}
        keyframesOptions={{
          duration: 2.5,
          times: [0, 0.05, 0.8, 1],
        }}
        className="!absolute inset-0"
        style={{ zIndex: 1 }}
      >
        {images.map((src, index) => (
          <ImageTrailItem key={index}>
            <div className="w-44 h-44 sm:w-52 sm:h-52 relative overflow-hidden rounded-lg opacity-70">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>

      {/* Content — full height, pointer-events pass through except on links */}
      <div
        className="relative min-h-screen pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="min-h-screen [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
