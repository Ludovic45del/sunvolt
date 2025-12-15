import React from "react";
// Assurez-vous que les fichiers sont dans le même dossier
import { useSolarSimulation } from "./useSolarSimulation";
import ImmersiveView from "./ImmersiveView";
import DashboardPanel from "./DashboardPanel";

export default function App() {
  // 1. Initialisation de la logique
  const { time, setTime, isPlaying, setIsPlaying, simData, isNight, isDusk } =
    useSolarSimulation();

  // 2. Rendu de l'interface
  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 lg:p-8 font-sans text-slate-800">
      <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[800px] border border-gray-100">
        {/* Partie Gauche : Visuel réaliste */}
        <ImmersiveView simData={simData} isNight={isNight} isDusk={isDusk} />

        {/* Partie Droite : Dashboard de contrôle */}
        <DashboardPanel
          simData={simData}
          time={time}
          setTime={setTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}
