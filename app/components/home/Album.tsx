"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, floatingVariants } from "@/app/lib/constants";
import Picture from "../common/Picture";
import { Check, Heart, Share2 } from "lucide-react";
import { useIncreaseLikeCountMutation } from "@/app/redux/services/likeApi";

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
  const [copied, setCopied] = useState(false);

  const [increaseLinkCount] = useIncreaseLikeCountMutation();

  const handleIncreaseLikeCount = async () => {
    await increaseLinkCount({}).unwrap();
    setIsLiked(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "The Iron Roses",
      text: "Check out The Iron Roses - Epic rock music that will blow your mind! 🎸🔥",
      url: "https://ironroses.vercel.app",
    };

    try {
      // Try native share API first (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData);
        return; // Don't show copied state for native share
      }

      // Fallback to clipboard copy (desktop)
      await navigator.clipboard.writeText("https://ironroses.vercel.app");
      setCopied(true);

      // Reset back to share icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err: any) {
      // Handle share cancellation gracefully
      if (err.name === "AbortError") {
        // User canceled the share - do nothing, this is normal behavior
        return;
      }

      // Handle other errors by falling back to clipboard copy
      console.error("Share failed, trying clipboard fallback: ", err);
      try {
        await navigator.clipboard.writeText("https://ironroses.vercel.app");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (clipboardErr) {
        console.error("Clipboard fallback also failed: ", clipboardErr);
        // Silently fail - don't show error to user
      }
    }
  };

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
          <div className="absolute inline-block z-10 group-hover:-translate-x-32 duration-500">
            <Picture
              src="/images/ep.jpg"
              alt="The Iron Roses EP Cover"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto object-cover rounded-xl shadow-2xl border border-pink-500/30"
              priority={true}
            />
          </div>

          {/* Vinyl Record that slides out */}
          <motion.div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 group-hover:translate-x-32 duration-500">
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
            Delivering the raw power and emotional depth that is the backbone of
            The Iron Roses, their latest ep &quot;AGITPOP&quot; perfectly blends
            a politically-driven message of joy and rage with a melodic punch to
            the gut.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={handleIncreaseLikeCount}
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
              onClick={handleShare}
              className={`p-3 rounded-full border transition-all duration-300 ${
                copied
                  ? "border-green-500/50 text-green-400 bg-green-500/20"
                  : "border-pink-500/30 text-pink-400 hover:bg-pink-500/20"
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: copied ? [1, 1.2, 1] : 1,
                  rotate: copied ? [0, 360] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {copied ? <Check size={20} /> : <Share2 size={20} />}
              </motion.div>
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
      </div>
    </motion.section>
  );
};

export default Album;
