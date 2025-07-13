import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  categories,
  fadeInUp,
  glowVariants,
  IPlatformLink,
  ironRosesPlatforms,
  platformItemVariants,
  staggerContainer,
} from "@/app/lib/constants";
import Picture from "../common/Picture";
import { ExternalLink } from "lucide-react";

const PlatformLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null) as any;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPlatforms =
    selectedCategory === "all"
      ? ironRosesPlatforms
      : ironRosesPlatforms.filter(
          (platform: IPlatformLink) => platform.category === selectedCategory
        );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Listen & Follow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Follow our journey and stream our music across all platforms
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center mb-12 px-4"
        >
          <div className="flex flex-wrap gap-2 p-2 bg-black/30 rounded-full backdrop-blur-sm border border-pink-500/20 max-w-full">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-pink-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Platform Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredPlatforms.map((platform, i) => (
            <motion.a
              key={`${platform.name}-${selectedCategory}`}
              layout
              variants={platformItemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <motion.div
                variants={glowVariants}
                className="relative flex flex-col items-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-pink-500/20 overflow-hidden transition-all duration-500"
              >
                {/* Background gradient that changes on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)`,
                  }}
                />

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/50"
                  whileHover={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(236, 72, 153, 0.1), transparent)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon container */}
                <motion.div
                  className="relative z-10 mb-4"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.6, ease: "easeInOut" },
                  }}
                >
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-xl"
                    whileHover={{
                      background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}40)`,
                      boxShadow: `0 10px 30px ${platform.color}30`,
                    }}
                  >
                    <Picture
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                      priority={false}
                    />
                  </motion.div>
                </motion.div>

                {/* Platform name */}
                <motion.span
                  className="relative z-10 text-sm md:text-base font-semibold text-center uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {platform.name}
                </motion.span>

                {/* External link icon */}
                <motion.div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <ExternalLink size={16} className="text-pink-400" />
                </motion.div>

                {/* Hover effect particles */}
                {hoveredIndex === i && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(3)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute w-1 h-1 bg-pink-400 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: particleIndex * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div variants={fadeInUp} className="text-center mt-16">
          <motion.p className="text-gray-400 mb-6" whileHover={{ scale: 1.05 }}>
            Don&apos;t miss our latest releases and updates
          </motion.p>
          <motion.a
            href="https://linktr.ee/TheIronRoses"
            target="_blank"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
          >
            Everything Iron Roses
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlatformLinks;
