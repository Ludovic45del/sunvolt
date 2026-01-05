// useSolarSimulation.js
import { useState, useEffect, useMemo } from "react";

export function useSolarSimulation() {
  // Temps en minutes (0 = 00:00, 720 = 12:00)
  const [time, setTime] = useState(720);
  const [isPlaying, setIsPlaying] = useState(false);

  const simData = useMemo(() => {
    const hour = time / 60;

    // 1. Courbe Solaire
    let pv = 0;
    if (hour > 5.5 && hour < 20.5) {
      pv = Math.max(0, 5.0 * Math.sin(((hour - 5.5) * Math.PI) / 15));
    }

    // 2. Consommation Maison
    let load = 0.4;
    if (hour > 6.5 && hour < 9) load += 1.8;
    if (hour > 18 && hour < 23) load += 2.5;
    if (hour > 10 && hour < 16) load += 0.5;

    // 3. Batterie
    let soc = 30;
    if (hour < 7) soc = Math.max(30, 60 - hour * 4);
    else if (hour < 10) soc = Math.max(30, 30);
    else if (hour < 17) soc = Math.min(100, 30 + (hour - 10) * 10);
    else soc = Math.max(30, 100 - (hour - 17) * 9);

    // 4. Flux
    const netSolar = pv - load;
    let batteryFlow = 0;
    let gridFlow = 0;

    if (netSolar > 0) {
      if (soc < 100) {
        batteryFlow = Math.min(netSolar, 3.5);
        gridFlow = -(netSolar - batteryFlow);
      } else {
        gridFlow = -netSolar;
      }
    } else {
      const needed = Math.abs(netSolar);
      if (soc > 30) {
        batteryFlow = -Math.min(needed, 3.5);
        gridFlow = needed + batteryFlow;
      } else {
        gridFlow = needed;
      }
    }

    return {
      hour,
      pv: pv.toFixed(2),
      load: load.toFixed(2),
      soc: Math.round(soc),
      batteryFlow: batteryFlow.toFixed(2),
      gridFlow: gridFlow.toFixed(2),
      formattedTime: `${Math.floor(hour)
        .toString()
        .padStart(2, "0")}:${Math.floor(time % 60)
        .toString()
        .padStart(2, "0")}`,
    };
  }, [time]);

  // Boucle d'animation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => (prev + 2 >= 1440 ? 0 : prev + 2));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Helpers pour le style
  const isNight = simData.hour < 6 || simData.hour > 20;
  const isDusk =
    (simData.hour >= 6 && simData.hour < 8) ||
    (simData.hour >= 19 && simData.hour <= 21);

  return { time, setTime, isPlaying, setIsPlaying, simData, isNight, isDusk };
}
