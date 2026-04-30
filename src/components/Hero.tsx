"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background - currently black placeholder */}
      <motion.div
        className="absolute inset-0 bg-[#000000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Future: <Image /> component will go here */}
      </motion.div>

      {/* Text content - bottom left */}
      <div className="relative z-10 flex h-full items-end pb-[10vh] pl-[6vw] md:pl-[10vh]">
        <h1 className="flex flex-col gap-0 text-[#ffffff]">
          <span className="block font-garamond text-[clamp(80px,13vw,180px)] font-normal italic leading-[0.92]">
            Hi, I&apos;m
          </span>
          <span className="-mt-[0.06em] block font-garamond text-[clamp(80px,13vw,180px)] font-bold not-italic leading-[0.92]">
            Amogh
          </span>
        </h1>
      </div>
    </section>
  );
}
