import React from "react";
import {
  Sun,
  Home,
  Battery,
  Zap,
  Settings,
  Wifi,
  Signal,
  Menu,
  User,
  Activity,
  Bell,
} from "lucide-react";

export default function DashboardPanel({
  simData,
  time,
  setTime,
  isPlaying,
  setIsPlaying,
}) {
  // Helper pour les particules animées (SVG)
  const FlowParticle = ({ color, path, condition }) => {
    if (!condition) return null;
    return (
      <circle r="3" fill={color}>
        <animateMotion
          dur="1.5s"
          repeatCount="indefinite"
          path={path}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>
    );
  };

  return (
    <div className="flex-1 bg-gray-100 relative flex items-center justify-center p-4 lg:p-0 overflow-hidden">
      {/* Décoration d'arrière-plan floue */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-200 rounded-full blur-[100px] opacity-50"></div>
      </div>

      {/* ==================== CADRE IPHONE 17 ==================== */}
      <div className="relative z-10 w-[360px] h-[780px] bg-black rounded-[3.5rem] p-3 shadow-2xl border-[4px] border-[#333] ring-1 ring-black/50">
        {/* Écran Interne */}
        <div className="w-full h-full bg-slate-50 rounded-[2.8rem] overflow-hidden relative flex flex-col font-sans">
          {/* --- STATUS BAR (iOS) --- */}
          <div className="h-12 w-full flex justify-between items-center px-6 pt-3 z-30 text-slate-900 font-medium text-xs select-none">
            <span>9:41</span>
            <div className="flex items-center space-x-1.5">
              <Signal size={14} fill="currentColor" />
              <Wifi size={14} />
              <Battery size={14} fill="currentColor" />
            </div>
          </div>

          {/* --- DYNAMIC ISLAND --- */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-40 flex items-center justify-center">
            {/* Petite animation subtile si actif */}
            <div className="w-1 h-1 rounded-full bg-green-500/50 absolute right-3 animate-pulse"></div>
          </div>

          {/* --- APP HEADER (SolaX Style) --- */}
          <div className="px-5 py-2 flex items-center justify-between z-20">
            <Menu size={20} className="text-slate-600" />
            <span className="font-bold text-lg tracking-tight text-slate-800">
              SolaX Cloud
            </span>
            <div className="relative">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
          </div>

          {/* --- SCROLLABLE CONTENT --- */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-20 relative">
            {/* Widget État Système */}
            <div className="px-5 mt-4">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Système Normal
                </span>
              </div>
            </div>

            {/* --- DIAGRAMME CIRCULAIRE (Le cœur de l'app) --- */}
            <div className="relative w-full h-[320px] flex items-center justify-center scale-95">
              {/* SVG Overlay pour les flux */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 320 320"
              >
                {/* Chemins courbes stylisés */}
                {/* PV (Haut) -> Onduleur (Centre) */}
                <path
                  d="M 160,60 Q 160,110 160,160"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Onduleur -> Load (Bas) */}
                <path
                  d="M 160,160 Q 160,210 160,260"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Grid (Gauche) <-> Onduleur */}
                <path
                  d="M 60,160 Q 110,160 160,160"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Onduleur <-> Batterie (Droite) */}
                <path
                  d="M 160,160 Q 210,160 260,160"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Particules Animées */}
                <FlowParticle
                  color="#fbbf24"
                  path="M 160,60 L 160,160"
                  condition={parseFloat(simData.pv) > 0}
                />
                <FlowParticle
                  color="#a855f7"
                  path="M 160,160 L 160,260"
                  condition={parseFloat(simData.load) > 0}
                />

                {/* Grid Logic */}
                <FlowParticle
                  color="#ef4444"
                  path="M 60,160 L 160,160"
                  condition={parseFloat(simData.gridFlow) > 0}
                />
                <FlowParticle
                  color="#22c55e"
                  path="M 160,160 L 60,160"
                  condition={parseFloat(simData.gridFlow) < 0}
                />

                {/* Battery Logic */}
                <FlowParticle
                  color="#22c55e"
                  path="M 160,160 L 260,160"
                  condition={parseFloat(simData.batteryFlow) > 0}
                />
                <FlowParticle
                  color="#ef4444"
                  path="M 260,160 L 160,160"
                  condition={parseFloat(simData.batteryFlow) < 0}
                />
              </svg>

              {/* --- ELEMENTS DU DOM (Icones) --- */}

              {/* ONDULEUR (Centre) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg z-20 flex flex-col items-center justify-center border border-slate-100">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3665/3665909.png"
                  className="w-8 h-8 opacity-80 mb-1"
                  alt="Inverter"
                />
                <span className="text-[10px] font-bold text-slate-500">
                  X1-Hybrid
                </span>
              </div>

              {/* PV (Haut) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mb-1 transition-colors ${
                    parseFloat(simData.pv) > 0
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Sun size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {simData.pv} kW
                </span>
              </div>

              {/* LOAD (Bas) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <span className="text-xs font-bold text-slate-700 mb-1">
                  {simData.load} kW
                </span>
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-200">
                  <Home size={20} />
                </div>
              </div>

              {/* GRID (Gauche) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mb-1 ${
                    parseFloat(simData.gridFlow) !== 0
                      ? "bg-slate-800 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Zap size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {Math.abs(simData.gridFlow)} kW
                </span>
              </div>

              {/* BATTERY (Droite) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mb-1 ${
                    simData.soc < 30
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <Battery size={20} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-700">
                    {simData.soc}%
                  </span>
                  <span className="text-[8px] text-slate-400">
                    {parseFloat(simData.batteryFlow) > 0
                      ? "Charge"
                      : "Décharge"}
                  </span>
                </div>
              </div>
            </div>

            {/* --- CARTES DE DONNÉES --- */}
            <div className="px-5 grid grid-cols-2 gap-3 mt-2">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Production
                </div>
                <div className="text-xl font-bold text-slate-800">
                  24.5{" "}
                  <span className="text-xs font-normal text-slate-400">
                    kWh
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Autosuffisance
                </div>
                <div className="text-xl font-bold text-green-600">
                  85{" "}
                  <span className="text-xs font-normal text-slate-400">%</span>
                </div>
              </div>
            </div>

            {/* --- WIDGET DE SIMULATION (Intégré à l'app) --- */}
            <div className="mx-5 mt-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Simulateur 24H
                </span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full text-white transition-colors ${
                    isPlaying ? "bg-red-500" : "bg-slate-800"
                  }`}
                >
                  {isPlaying ? "STOP" : "PLAY"}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1440"
                value={time}
                onChange={(e) => {
                  setIsPlaying(false);
                  setTime(parseInt(e.target.value));
                }}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
              />
              <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-mono">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
              </div>
            </div>

            {/* Espace pour le scroll */}
            <div className="h-10"></div>
          </div>

          {/* --- BOTTOM NAVIGATION BAR (iOS) --- */}
          <div className="absolute bottom-0 w-full h-[85px] bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-start pt-4 justify-around z-30">
            <div className="flex flex-col items-center space-y-1 text-slate-800">
              <Home size={22} fill="currentColor" className="text-slate-800" />
              <span className="text-[9px] font-medium">Accueil</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Activity size={22} />
              <span className="text-[9px] font-medium">Données</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={22} />
              <span className="text-[9px] font-medium">Réglages</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors">
              <User size={22} />
              <span className="text-[9px] font-medium">Profil</span>
            </div>
          </div>

          {/* HOME INDICATOR (iOS) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-slate-900 rounded-full z-40"></div>
        </div>
      </div>
    </div>
  );
}
