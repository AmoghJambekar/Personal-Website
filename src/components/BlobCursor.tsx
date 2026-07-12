"use client";

import { useEffect, useRef } from "react";

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    // Hide on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      blob.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let blobX = 0;
    let blobY = 0;
    let animationId: number;
    const ease = 0.12;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      // Force update position on scroll
    };

    const animate = () => {
      blobX += (mouseX - blobX) * ease;
      blobY += (mouseY - blobY) * ease;
      blob.style.left = `${blobX}px`;
      blob.style.top = `${blobY}px`;

      // Hover detection
      const hoverTargets = document.querySelectorAll(
        ".nav-link, .inline-link, .contact-link, .download-btn, .skill-bubble, h2"
      );

      let isHovering = false;
      let hoverClass = "";
      let targetWidth = 20;
      let targetHeight = 20;

      hoverTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          isHovering = true;
          targetWidth = rect.width + 16;
          targetHeight = rect.height + 8;

          if (el.classList.contains("nav-link")) {
            hoverClass = "hover-button";
          } else if (el.classList.contains("inline-link")) {
            hoverClass = "hover-underline";
            targetWidth = rect.width;
            targetHeight = 3;
          } else if (el.classList.contains("contact-link")) {
            hoverClass = "hover-contact";
          } else if (el.classList.contains("download-btn")) {
            hoverClass = "hover-button";
          } else if (el.classList.contains("skill-bubble")) {
            hoverClass = "hover-skill";
          } else if (el.tagName === "H2") {
            hoverClass = "hover-header";
          }
        }
      });

      // Remove all hover classes
      blob.classList.remove(
        "hover-header",
        "hover-button",
        "hover-contact",
        "hover-skill",
        "hover-underline"
      );

      if (isHovering && hoverClass) {
        blob.classList.add(hoverClass);
        blob.style.width = `${targetWidth}px`;
        blob.style.height = `${targetHeight}px`;
      } else {
        blob.style.width = "20px";
        blob.style.height = "20px";
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={blobRef} className="blob-cursor" />;
}
