"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  floatingVariants,
  staggerContainer,
  trackItemVariants,
} from "@/app/lib/constants";
import Picture from "../common/Picture";
import { Heart, Music, Share2 } from "lucide-react";

interface IGenerateParticles {
  id: number;
  left: number;
  top: number;
  delay: number;
}

const Album = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [audioVisualizer, setAudioVisualizer] = useState([]);
  const [particles, setParticles] = useState<IGenerateParticles[]>([]);

  const tracks = [
    { id: 1, title: "Class War Cheer Squad", duration: "3:45" },
    { id: 2, title: "Fight Back", duration: "4:12" },
    { id: 3, title: "Burn", duration: "3:28" },
  ];

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 0.5,
      }));
    };

    setParticles(generateParticles());
  }, []);

  useEffect(() => {
    const generateBars: any = () => {
      return Array.from({ length: 20 }, () => Math.random() * 100);
    };

    const interval = setInterval(() => {
      setAudioVisualizer(generateBars());
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="py-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-pink-500/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={floatingVariants}
            transition={{ delay: particle.delay }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Album Cover Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative flex justify-center items-center group w-fit mx-auto"
        >
          <div className="absolute inline-block z-10 group-hover:-translate-x-20 duration-500">
            <Picture
              src="/images/ep.jpg"
              alt="Iron Roses EP Cover"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto object-cover rounded-xl shadow-2xl border border-pink-500/30"
              priority={true}
            />
          </div>

          {/* Vinyl Record that slides out */}
          <motion.div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 group-hover:translate-x-20 duration-500">
            <motion.div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-gray-700/30 rounded-full"
                    style={{
                      left: `${8 + i * 7}%`,
                      top: `${8 + i * 7}%`,
                      right: `${8 + i * 7}%`,
                      bottom: `${8 + i * 7}%`,
                    }}
                  />
                ))}
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center border-4 border-black">
                <div className="text-white text-xs md:text-sm font-bold text-center">
                  <div>IRON</div>
                  <div>ROSES</div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>

              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(255,255,255,0.1), transparent, transparent)",
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    "linear-gradient(135deg, transparent, transparent, rgba(255,255,255,0.1))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Album Title and Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Agitpop EP
          </h2>
          <p className="text-pink-400 text-lg mb-4">
            The Iron Roses • {new Date().getFullYear()}
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto mb-6">
            Experience the raw power and emotional depth of The Iron Roses&apos;
            latest EP. A perfect blend of intensity and beauty that will leave
            you breathless.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full border border-pink-500/30 transition-colors duration-300 ${
                isLiked
                  ? "bg-pink-500 text-white"
                  : "text-pink-400 hover:bg-pink-500/20"
              }`}
            >
              <Heart size={20} fill={isLiked ? "white" : "none"} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition-colors duration-300"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Audio Visualizer */}
        <div className="flex justify-center items-end gap-1 mb-8 h-16">
          {audioVisualizer.map((height, index) => (
            <motion.div
              key={index}
              className="w-2 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full"
              animate={{
                height: `${Math.max(height * 0.5, 10)}px`,
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Track List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Music size={20} />
              Track List
            </h3>

            <div className="space-y-2">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  variants={trackItemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center justify-between hover:bg-gray-800/50`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <span className="text-pink-400 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-white font-medium">
                      {track.title}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {track.duration}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Album;
