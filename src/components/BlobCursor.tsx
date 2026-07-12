"use client";

import { useEffect, useRef } from "react";

const HOVER_CLASSES: Record<string, string> = {
  header: "hover-header",
  contact: "hover-contact",
  button: "hover-button",
  skill: "hover-skill",
  underline: "hover-underline",
};

function expandRect(
  rect: DOMRect,
  pad: { top: number; right: number; bottom: number; left: number }
) {
  return new DOMRect(
    rect.left - pad.left,
    rect.top - pad.top,
    rect.width + pad.left + pad.right,
    rect.height + pad.top + pad.bottom
  );
}

function hitTest(
  x: number,
  y: number,
  rect: DOMRect,
  pad = { top: 0, right: 0, bottom: 0, left: 0 }
) {
  return (
    x >= rect.left - pad.left &&
    x <= rect.right + pad.right &&
    y >= rect.top - pad.top &&
    y <= rect.bottom + pad.bottom
  );
}

type HoverTarget = { type: string; bounds: DOMRect } | null;

function detectHover(x: number, y: number): HoverTarget {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;

  const pad = { top: 2, right: 8, bottom: 2, left: 8 };

  for (const navLink of document.querySelectorAll(".nav-link")) {
    const rect = navLink.getBoundingClientRect();
    if (hitTest(x, y, rect)) {
      return { type: "header", bounds: expandRect(rect, pad) };
    }
  }

  for (const inlineLink of document.querySelectorAll(".inline-link")) {
    const rect = inlineLink.getBoundingClientRect();
    if (hitTest(x, y, rect)) {
      return { type: "header", bounds: expandRect(rect, pad) };
    }
  }

  const skillBubble = el.closest(".skill-bubble");
  if (skillBubble) {
    const rect = skillBubble.getBoundingClientRect();
    const sPad = { top: 4, right: 8, bottom: 4, left: 8 };
    if (hitTest(x, y, rect, sPad)) {
      return { type: "skill", bounds: expandRect(rect, sPad) };
    }
  }

  const contactLink = el.closest(".contact-link");
  if (contactLink) {
    const rect = contactLink.getBoundingClientRect();
    return {
      type: "contact",
      bounds: new DOMRect(rect.left, rect.bottom - 2, rect.width, 2),
    };
  }

  const downloadBtn = el.closest(".download-btn");
  if (downloadBtn) {
    const rect = downloadBtn.getBoundingClientRect();
    const bPad = { top: 2, right: 8, bottom: 2, left: 8 };
    if (hitTest(x, y, rect, bPad)) {
      return {
        type: "button",
        bounds: expandRect(rect, { top: 2, right: 4, bottom: 2, left: 4 }),
      };
    }
  }

  const h2 = el.closest("h2");
  if (h2) {
    const range = document.createRange();
    range.selectNodeContents(h2);
    const rect = range.getBoundingClientRect();
    if (hitTest(x, y, rect, pad)) {
      return { type: "header", bounds: expandRect(rect, pad) };
    }
  }

  return null;
}

function lerp(a: number, b: number) {
  return a + (b - a) * 0.12;
}

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const mouseX = { current: 0 };
    const mouseY = { current: 0 };
    const blobX = { current: 0 };
    const blobY = { current: 0 };
    const blobW = { current: 20 };
    const blobH = { current: 20 };
    const hoverTarget: { current: HoverTarget } = { current: null };
    const prevType: { current: string | null } = { current: null };

    const onTouchStart = () => {
      blob.style.display = "none";
    };
    window.addEventListener("touchstart", onTouchStart, { once: true });

    const updateHover = (x: number, y: number) => {
      hoverTarget.current = detectHover(x, y);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      updateHover(e.clientX, e.clientY);
    };

    const onScroll = () => {
      updateHover(mouseX.current, mouseY.current);
    };

    const animate = () => {
      const target = hoverTarget.current;
      const type = target?.type ?? null;

      if (type !== prevType.current) {
        Object.values(HOVER_CLASSES).forEach((cls) =>
          blob.classList.remove(cls)
        );
        if (type) blob.classList.add(HOVER_CLASSES[type]);
        prevType.current = type;
      }

      if (target) {
        const cx = target.bounds.left + target.bounds.width / 2;
        const cy = target.bounds.top + target.bounds.height / 2;
        blobX.current = lerp(blobX.current, cx);
        blobY.current = lerp(blobY.current, cy);
        blobW.current = lerp(blobW.current, target.bounds.width);
        blobH.current = lerp(blobH.current, target.bounds.height);
      } else {
        blobX.current = lerp(blobX.current, mouseX.current);
        blobY.current = lerp(blobY.current, mouseY.current);
        blobW.current = lerp(blobW.current, 20);
        blobH.current = lerp(blobH.current, 20);
      }

      blob.style.transform = "translate(-50%, -50%)";
      blob.style.left = `${blobX.current}px`;
      blob.style.top = `${blobY.current}px`;
      blob.style.width = `${blobW.current}px`;
      blob.style.height = `${blobH.current}px`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, true);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("touchstart", onTouchStart);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={blobRef} className="blob-cursor" />;
}
