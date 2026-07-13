"use client";

import React from "react";
import { ImageTrail, type ImageTrailImage } from "@/components/ui/image-trail";

interface ContentWithTrailProps {
  children: React.ReactNode;
  images: string[];
}

export default function ContentWithTrail({ children, images }: ContentWithTrailProps) {
  const trailImages: ImageTrailImage[] = images.map((src) => ({ src, alt: "" }));

  if (trailImages.length === 0) {
    return <>{children}</>;
  }

  return (
    <ImageTrail
      images={trailImages}
      className="min-h-screen"
      spacing={150}
      duration={6000}
      imageSize={120}
      cornerRadius={10}
      fadeInDuration={1.5}
      fadeOutDuration={0.4}
      fadeInBlur={0}
      fadeOutBlur={6}
    >
      {children}
    </ImageTrail>
  );
}
