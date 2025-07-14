import React from "react";
import { motion } from "framer-motion";
import {
  contactLinks,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/app/lib/constants";

const Contact = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="relative py-20 px-4 bg-black overflow-hidden"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-pink-900/20" />

        {/* Floating roses and thorns */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            ></motion.div>
          ))}
        </div>

        {/* Pulsing energy rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-96 h-96 rounded-full border border-red-500/20" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-64 h-64 rounded-full border border-pink-500/20" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Enhanced Title Section */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative inline-block"
          >
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-pink-600/20 to-red-600/20 blur-3xl rounded-full" />

            <h2 className="relative text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider">
              <span
                className="bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
                }}
              >
                GET IN
              </span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 40px rgba(236, 72, 153, 0.6)",
                    "0 0 60px rgba(236, 72, 153, 0.8)",
                    "0 0 40px rgba(236, 72, 153, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                TOUCH
              </motion.span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <span className="text-red-400 font-bold tracking-widest text-sm">
              THE IRON ROSES
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            There is power in protest. Let&apos;s make some noise.
          </motion.p>
        </motion.div>

        {/* Enhanced Contact Cards */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-col gap-8 max-w-2xl mx-auto"
        >
          {contactLinks.map((contact, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{
                y: -12,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                whileHover={{
                  scale: 1.1,
                }}
              />

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-full h-full bg-black rounded-2xl" />
              </div>

              {/* Main card content */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 group-hover:border-red-500/50 transition-all duration-300 text-center overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute bottom-4 left-4 text-4xl rotate-12">
                    ⚡
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Role with enhanced styling */}
                  <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
                    <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-wide">
                      {contact.role}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 mx-auto" />
                  </motion.div>

                  {/* Name */}
                  <motion.p
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    className="text-gray-300 mb-6 text-lg font-medium"
                  >
                    {contact.name}
                  </motion.p>

                  {/* Email button */}
                  <motion.a
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${contact.email}`}
                    className="group/email relative inline-block w-full"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-xl font-bold text-white uppercase tracking-wide text-sm hover:from-red-500 hover:to-pink-500 transition-all duration-300">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                      >
                        {contact.email}
                      </motion.span>

                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </motion.a>
                </div>

                {/* Floating sparks on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(4)].map((_, sparkIndex) => (
                    <motion.div
                      key={sparkIndex}
                      className="absolute w-1 h-1 bg-red-400 rounded-full"
                      style={{
                        left: `${20 + sparkIndex * 20}%`,
                        top: `${30 + (sparkIndex % 2) * 40}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: sparkIndex * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm font-medium">
            🔥 Response within 24 hours • Professional booking only • Let&apos;s
            rock 🔥
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
