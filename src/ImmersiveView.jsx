// ImmersiveView.jsx
import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ImmersiveView({ simData, isNight, isDusk }) {
  return (
    <div className="relative flex-[1.3] overflow-hidden flex flex-col min-h-[500px] group bg-black">
      {/* --- 1. ARRIÈRE-PLAN (CIEL DYNAMIQUE) --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2600&auto=format&fit=crop"
          alt="Sky Day"
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2600&auto=format&fit=crop"
          alt="Sky Night"
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-orange-500/40 via-purple-900/20 to-transparent mix-blend-overlay transition-opacity duration-[2000ms]"
          style={{ opacity: isDusk ? 1 : 0 }}
        ></div>
      </div>

      {/* --- 2. ASTRES --- */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Soleil */}
        <div
          className="absolute w-40 h-40 transition-all duration-700 ease-out blur-[2px]"
          style={{
            top: `${
              simData.hour > 5 && simData.hour < 21
                ? 10 + Math.pow(Math.abs(simData.hour - 13) / 7, 2) * 50
                : 150
            }%`,
            left: `${((simData.hour - 6) / 14) * 100}%`,
            opacity: isNight ? 0 : 1,
          }}
        >
          <div className="w-full h-full bg-yellow-200 rounded-full blur-[20px] mix-blend-screen opacity-80"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-[5px]"></div>
        </div>

        {/* Lune */}
        <div
          className="absolute w-20 h-20 transition-all duration-700 ease-out"
          style={{
            top: `${simData.hour < 6 || simData.hour > 20 ? 15 : -50}%`,
            right: `${(((simData.hour + 12) % 24) / 24) * 80 + 10}%`,
            opacity: isNight ? 1 : 0,
          }}
        >
          <Moon className="w-full h-full text-blue-100 fill-blue-50 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
        </div>
      </div>

      {/* --- 3. MAISON & LUMIÈRES --- */}
      <div className="absolute bottom-0 w-full h-full flex items-end justify-center z-20 pb-0">
        <div className="relative w-full max-w-[800px] flex justify-center">
          <img
            src="/houseSunvolt1.png"
            alt="Ma Maison"
            className="relative z-20 w-full h-auto object-contain max-h-[500px] transition-all duration-[2000ms]"
            style={{
              filter: isNight
                ? "brightness(0.3) contrast(1.1) grayscale(0.2)"
                : isDusk
                ? "brightness(0.7) sepia(0.2)"
                : "brightness(1)",
            }}
          />

          {/* Fenêtres allumées */}
          <div
            className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-1000 mix-blend-screen"
            style={{ opacity: isNight ? 0.9 : 0 }}
          >
            <div className="absolute bottom-[20%] left-[45%] w-[15%] h-[10%] bg-[#ff9500] blur-xl opacity-60"></div>
            <div className="absolute top-[40%] right-[40%] w-[10%] h-[8%] bg-[#ff9500] blur-lg opacity-50"></div>
          </div>

          {/* Flux SVG sur la maison */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-40 overflow-visible"
            viewBox="0 0 800 500"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {parseFloat(simData.pv) > 0 && (
              <>
                <path
                  id="solarPath"
                  d="M 400,0 L 400,200"
                  stroke="transparent"
                  fill="none"
                />
                <circle r="4" fill="#fbbf24" filter="url(#glow)">
                  <animateMotion
                    dur={`${2.5 - parseFloat(simData.pv) / 3}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href="#solarPath" />
                  </animateMotion>
                </circle>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Widget Météo */}
      <div className="absolute top-8 left-8 z-50">
        <div className="text-white font-extralight text-7xl tracking-tighter drop-shadow-xl font-sans">
          {simData.formattedTime}
        </div>
        <div className="flex items-center space-x-3 text-white/90 mt-2 pl-2">
          {parseFloat(simData.pv) > 0 ? (
            <Sun className="text-yellow-300 animate-spin-slow" size={20} />
          ) : (
            <Moon className="text-blue-200" size={20} />
          )}
          <span className="text-lg font-medium tracking-wide uppercase drop-shadow-md">
            {isNight ? "Nuit Claire" : "Ensoleillé"}
          </span>
        </div>
      </div>
    </div>
  );
}
