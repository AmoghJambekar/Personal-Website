"use client"

import React, { ElementType, HTMLAttributes, useEffect, useMemo, useCallback } from "react"
import type { DOMKeyframesDefinition, AnimationOptions } from "framer-motion"
import { useAnimate } from "framer-motion"

function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface ImageTrailProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  as?: ElementType
  threshold?: number
  intensity?: number
  keyframes?: DOMKeyframesDefinition
  keyframesOptions?: AnimationOptions
  trailElementAnimationKeyframes?: {
    x?: AnimationOptions
    y?: AnimationOptions
  }
  repeatChildren?: number
  baseZIndex?: number
  zIndexDirection?: "new-on-top" | "old-on-top"
  excludeSelector?: string
}

interface ImageTrailItemProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: React.ReactNode
}

const MathUtils = {
  lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
  distanceSq: (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    return dx * dx + dy * dy
  },
}

const ImageTrail = ({
  className,
  as = "div",
  children,
  threshold = 100,
  intensity = 0.3,
  keyframes,
  keyframesOptions,
  repeatChildren = 3,
  trailElementAnimationKeyframes = {
    x: { duration: 1, type: "tween", ease: "easeOut" },
    y: { duration: 1, type: "tween", ease: "easeOut" },
  },
  baseZIndex = 0,
  zIndexDirection = "new-on-top",
  excludeSelector,
  ...props
}: ImageTrailProps) => {
  const allImages = React.useRef<NodeListOf<HTMLElement>>(undefined)
  const currentId = React.useRef(0)
  const lastMousePos = React.useRef({ x: 0, y: 0 })
  const cachedMousePos = React.useRef({ x: 0, y: 0 })
  const [containerRef, animate] = useAnimate()
  const zIndices = React.useRef<number[]>([])
  const rafId = React.useRef(0)
  const pendingEvent = React.useRef<{ clientX: number; clientY: number } | null>(null)

  // Cache exclude element rect — recalculate on scroll/resize, not every move
  const excludeRect = React.useRef<DOMRect | null>(null)
  const excludeEl = React.useRef<Element | null>(null)

  const thresholdSq = useMemo(() => threshold * threshold, [threshold])

  const clampedIntensity = useMemo(
    () => Math.max(0.0001, Math.min(1, intensity)),
    [intensity]
  )

  const refreshExcludeRect = useCallback(() => {
    if (!excludeSelector) return
    if (!excludeEl.current) {
      excludeEl.current = document.querySelector(excludeSelector)
    }
    if (excludeEl.current) {
      excludeRect.current = excludeEl.current.getBoundingClientRect()
    }
  }, [excludeSelector])

  useEffect(() => {
    allImages.current = containerRef?.current?.querySelectorAll(
      ".image-trail-item"
    ) as NodeListOf<HTMLElement>

    zIndices.current = Array.from(
      { length: allImages.current.length },
      (_, index) => index
    )
  }, [containerRef, allImages])

  // Cache exclude rect on scroll/resize instead of every mouse move
  useEffect(() => {
    refreshExcludeRect()
    window.addEventListener("resize", refreshExcludeRect)
    window.addEventListener("scroll", refreshExcludeRect, { passive: true })
    return () => {
      window.removeEventListener("resize", refreshExcludeRect)
      window.removeEventListener("scroll", refreshExcludeRect)
      cancelAnimationFrame(rafId.current)
    }
  }, [refreshExcludeRect])

  const processMove = useCallback(() => {
    const e = pendingEvent.current
    if (!e) return
    pendingEvent.current = null

    // Check exclude rect using cached value
    if (excludeRect.current) {
      const r = excludeRect.current
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        return
      }
    }

    const containerRect = containerRef?.current?.getBoundingClientRect()
    if (!containerRect) return

    const mousePos = {
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    }

    cachedMousePos.current.x = MathUtils.lerp(
      cachedMousePos.current.x || mousePos.x,
      mousePos.x,
      clampedIntensity
    )
    cachedMousePos.current.y = MathUtils.lerp(
      cachedMousePos.current.y || mousePos.y,
      mousePos.y,
      clampedIntensity
    )

    // Use squared distance to avoid Math.hypot
    const distSq = MathUtils.distanceSq(
      mousePos.x,
      mousePos.y,
      lastMousePos.current.x,
      lastMousePos.current.y
    )

    if (distSq > thresholdSq && allImages?.current) {
      const N = allImages.current.length
      const current = currentId.current

      if (zIndexDirection === "new-on-top") {
        for (let i = 0; i < N; i++) {
          if (i !== current) zIndices.current[i] -= 1
        }
        zIndices.current[current] = N - 1
      } else {
        for (let i = 0; i < N; i++) {
          if (i !== current) zIndices.current[i] += 1
        }
        zIndices.current[current] = 0
      }

      const el = allImages.current[current]
      // Position before showing to prevent flash at top-left
      const startX = cachedMousePos.current.x - el.offsetWidth / 2
      const startY = cachedMousePos.current.y - el.offsetHeight / 2
      el.style.transform = `translate(${startX}px, ${startY}px)`
      el.style.opacity = "0"
      el.style.display = "block"
      allImages.current.forEach((img, index) => {
        img.style.zIndex = String(zIndices.current[index] + baseZIndex)
      })

      animate(
        el,
        {
          x: [
            cachedMousePos.current.x - el.offsetWidth / 2,
            mousePos.x - el.offsetWidth / 2,
          ],
          y: [
            cachedMousePos.current.y - el.offsetHeight / 2,
            mousePos.y - el.offsetHeight / 2,
          ],
          ...keyframes,
        },
        {
          ...trailElementAnimationKeyframes.x,
          ...trailElementAnimationKeyframes.y,
          ...keyframesOptions,
        }
      )
      currentId.current = (current + 1) % N
      lastMousePos.current = { x: mousePos.x, y: mousePos.y }
    }
  }, [
    animate, baseZIndex, clampedIntensity, containerRef,
    keyframes, keyframesOptions, thresholdSq,
    trailElementAnimationKeyframes, zIndexDirection,
  ])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    pendingEvent.current = { clientX: e.clientX, clientY: e.clientY }
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(processMove)
  }, [processMove])

  const ElementTag = as ?? "div"

  return (
    <ElementTag
      className={cx("h-full w-full relative", className)}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      {...props}
    >
      {Array.from({ length: repeatChildren }).map((_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ))}
    </ElementTag>
  )
}

export const ImageTrailItem = ({
  className,
  children,
  as = "div",
  ...props
}: ImageTrailItemProps) => {
  const ElementTag = as ?? "div"
  return (
    <ElementTag
      {...props}
      className={cx(
        "absolute top-0 left-0 will-change-transform hidden",
        className,
        "image-trail-item"
      )}
    >
      {children}
    </ElementTag>
  )
}

export default ImageTrail
