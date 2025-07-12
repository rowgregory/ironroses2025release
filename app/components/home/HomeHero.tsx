import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Picture from "../common/Picture";
import { glowPulse } from "@/app/lib/constants";
import { Menu } from "lucide-react";

const HomeHero = ({ scrollToAlbum }: any) => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      <motion.div
        style={{ scale: scaleProgress }}
        className="absolute inset-0 w-full h-full"
      >
        <Picture
          src="/images/band.jpg"
          alt="The Iron Roses"
          className="w-full h-full object-cover border-2 border-pink-500/30"
          priority={true}
        />
        {/* Dark overlay for text readability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-black/50"
        />
      </motion.div>

      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Glowing orbs with enhanced animations */}
        <motion.div
          animate={glowPulse}
          className="absolute top-1/6 right-1/6 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            ...glowPulse,
            transition: { ...glowPulse.transition, delay: 1.5 },
          }}
          className="absolute bottom-20 left-1/2 w-48 h-48 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl"
        />
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute top-1/3 left-2/3 w-32 h-32 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-2xl"
        />
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="px-4 pt-6 mx-auto max-w-screen-lg w-full flex items-center justify-end z-10 relative"
      >
        <motion.h1 className="font-black">
          <Menu onClick={scrollToAlbum} className="text-white w-5 h-5" />
        </motion.h1>
      </motion.header>

      {/* Hero Title & Subtitle */}
      <div className="mt-10 md:mt-32 flex-1 flex flex-col items-center text-center px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Picture
            src="/images/logo.png"
            className="bg-cover w-[1000px]"
            priority={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="max-w-2xl mx-auto mt-60"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={scrollToAlbum}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg uppercase tracking-wide shadow-lg transition-all duration-300"
            >
              <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                Listen Now
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="w-6 h-10 border-2 border-pink-500 rounded-full flex justify-center absolute left-1/2 -translate-x-1/2 bottom-7 z-10"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-1 h-3 bg-pink-500 rounded-full mt-2"
        />
      </motion.div>
    </div>
  );
};

export default HomeHero;
