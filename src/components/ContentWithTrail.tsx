"use client";

import React from "react";
import ImageTrail, { ImageTrailItem } from "@/components/ui/image-trail";

interface ContentWithTrailProps {
  children: React.ReactNode;
  images: string[];
}

export default function ContentWithTrail({ children, images }: ContentWithTrailProps) {
  if (images.length === 0) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Trail layer — full page, skips spawning over [data-trail-content] */}
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
                draggable={false}
              />
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>

      {/* Page content — above trail, events pass through except on links */}
      <div className="relative pointer-events-none" style={{ zIndex: 10 }}>
        <div className="[&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
