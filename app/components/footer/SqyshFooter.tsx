import React, { useState, useEffect } from "react";

const SqyshFooter = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchText, setGlitchText] = useState("SQYSH");

  useEffect(() => {
    const glitchChars = [
      "S",
      "Q",
      "Y",
      "S",
      "H",
      "5",
      "0",
      "√",
      "¥",
      "§",
      "Ω",
      "θ",
      "λ",
      "π",
    ];
    if (isHovered) {
      const interval = setInterval(() => {
        setGlitchText((prev) =>
          prev
            .split("")
            .map((char) =>
              Math.random() < 0.3
                ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                : char
            )
            .join("")
        );
      }, 100);

      const timeout = setTimeout(() => {
        setGlitchText("SQYSH");
      }, 800);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isHovered]);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="circuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="#0088ff" />
            </linearGradient>
          </defs>

          {/* Circuit paths */}
          <path
            d="M0,100 Q100,20 200,100 T400,100"
            stroke="url(#circuit)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,150 L100,150 L120,130 L150,130 L170,150 L400,150"
            stroke="url(#circuit)"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: "10,5",
              animation: "dash 3s linear infinite",
            }}
          />
          <path
            d="M0,50 L80,50 L100,70 L130,40 L160,70 L200,50 L400,50"
            stroke="url(#circuit)"
            strokeWidth="1"
            fill="none"
            className="opacity-60"
          />
        </svg>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Developer Credit */}
          <div className="text-center mb-6">
            <a href="https://sqysh.io?cameFrom=iron_roses" target="_blank">
              <div className="inline-block relative">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Glowing Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />

                  {/* Main Container */}
                  <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 group-hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center gap-3">
                      {/* Terminal Icon */}
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 1v10h12V5H4zm2 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 016 8zm0 2a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 016 10zm0 2a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4A.5.5 0 016 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {/* Text Content */}
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1 font-mono">
                          &lt;developed_by&gt;
                        </p>
                        <h3
                          className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-green-300 group-hover:via-blue-400 group-hover:to-purple-500 transition-all duration-300"
                          style={{
                            fontFamily: "monospace",
                            textShadow: isHovered
                              ? "0 0 20px rgba(34, 197, 94, 0.5)"
                              : "none",
                          }}
                        >
                          {glitchText}
                        </h3>
                        <p className="text-gray-400 text-sm font-mono">
                          &lt;/developed_by&gt;
                        </p>
                      </div>

                      {/* Animated Cursor */}
                      <div className="w-0.5 h-6 bg-green-400 animate-pulse ml-1" />
                    </div>

                    {/* Subtitle */}
                    <div className="mt-4 text-center">
                      <p className="text-gray-500 text-xs font-mono">
                        Crafting digital experiences with passion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Tech Stack Indicators */}
          <div className="flex justify-center gap-4 mb-6">
            {[
              { name: "React", color: "from-blue-400 to-blue-600" },
              { name: "Next.js", color: "from-gray-400 to-gray-600" },
              { name: "Node.js", color: "from-green-400 to-green-600" },
              { name: "TypeScript", color: "from-blue-500 to-blue-700" },
            ].map((tech, i) => (
              <div key={i} className="group relative">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color} group-hover:scale-150 transition-all duration-300`}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {tech.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-center items-center gap-4 text-xs text-gray-500 font-mono">
            <span>© 2025</span>
            <span>•</span>
            <span className="text-green-400">STATUS: ONLINE</span>
            <span>•</span>
            <span>BUILD: v1.0.0</span>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -30;
          }
        }
      `}</style>
    </footer>
  );
};

export default SqyshFooter;
