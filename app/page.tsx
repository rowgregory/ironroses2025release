"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import HomeHero from "./components/home/HomeHero";
import Album from "./components/home/Album";
import PlatformLinks from "./components/home/PlatformLinks";
import Store from "./components/home/Store";
import SqyshFooter from "./components/footer/SqyshFooter";
import Contact from "./components/home/Contact";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const IronRosesHomepage = () => {
  const albumRef = useRef(null) as any;

  const scrollToAlbum = () => {
    albumRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Provider store={store}>
      <div className="min-h-dvh bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Hero Section */}
        <HomeHero scrollToAlbum={scrollToAlbum} />

        {/* Album Section */}
        <div ref={albumRef}>
          <Album />
        </div>

        {/* Platform Links */}
        <PlatformLinks />

        {/* Store Section */}
        <Store />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-8 px-4 bg-black text-center border-t border-pink-500/20"
        >
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="text-gray-400"
          >
            The Iron Roses. All rights reserved.
          </motion.p>
        </motion.footer>
        <SqyshFooter />
      </div>
    </Provider>
  );
};

export default IronRosesHomepage;
