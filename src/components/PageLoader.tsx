"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpiralLoader } from "./ui/spiral-loader";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_DURATION = 800;
    const MAX_DURATION = 4000;
    const start = Date.now();

    function done() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => setLoading(false), remaining);
    }

    // Wait for all images in the document to finish loading
    function checkImages() {
      const images = Array.from(document.images);
      if (images.length === 0) {
        done();
        return;
      }

      const promises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      });

      Promise.all(promises).then(done);
    }

    // Use requestIdleCallback or setTimeout to check after initial render
    const raf = requestAnimationFrame(() => {
      setTimeout(checkImages, 0);
    });

    // Fallback max timeout so we never hang forever
    const fallback = setTimeout(() => setLoading(false), MAX_DURATION);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--background)",
            zIndex: 50,
          }}
        >
          <SpiralLoader size={32} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
