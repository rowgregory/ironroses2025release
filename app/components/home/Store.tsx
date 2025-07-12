import React from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  storeLinks,
} from "@/app/lib/constants";

const Store = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="relative py-20 px-4 bg-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-gray-700 to-black" />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Enhanced Title with Steel Text Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider relative"
            style={{
              background:
                "linear-gradient(45deg, #ef4444, #ec4899, #dc2626, #be185d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 30px rgba(239, 68, 68, 0.5)",
                  "0 0 50px rgba(239, 68, 68, 0.8)",
                  "0 0 30px rgba(239, 68, 68, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              MERCH
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <span className="text-red-400 font-bold tracking-widest text-sm">
              IRON ROSES
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-300 text-lg font-medium"
          >
            Forge your style with our exclusive collection
          </motion.p>
        </motion.div>

        {/* Enhanced Store Buttons */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {storeLinks.map((store, i) => (
            <motion.a
              key={i}
              variants={staggerItem}
              whileHover={{
                scale: 1.1,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block overflow-hidden"
            >
              {/* Button Content */}
              <div className="relative px-10 py-5 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 rounded-2xl m-0.5">
                <motion.span
                  className="inline-block text-white font-black text-xl uppercase tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {store.name}
                </motion.span>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                {/* Sparks Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(6)].map((_, sparkIndex) => (
                    <motion.div
                      key={sparkIndex}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + sparkIndex * 15}%`,
                        top: `${20 + (sparkIndex % 2) * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.4,
                        delay: sparkIndex * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-gray-400 text-sm font-medium">
            ⚡ Limited edition designs • Premium quality • Rock the rebellion ⚡
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Store;
