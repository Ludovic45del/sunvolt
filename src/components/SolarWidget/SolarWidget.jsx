
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Car, Zap } from 'lucide-react';

import { useSolarPresets } from '../../useSolarPresets';
import { useSolarData } from '../../hooks/useSolarData';

import EnergyBarChart from './EnergyBarChart';
import DeviceTile from './DeviceTile';
import TimeOfDaySelector from './TimeOfDaySelector';
import Hotspot from './Hotspot';

const BackgroundLayer = memo(({ preset, isActive, baseUrl }) => (
    <div
        role="img"
        aria-label={`${preset.label} scene background`}
        aria-hidden={!isActive}
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'}`}
        style={{ backgroundImage: `url(${baseUrl}/assets/${preset.image})` }}
    />
));
BackgroundLayer.displayName = 'BackgroundLayer';




const STARS = Array.from({ length: 12 }, (_, i) => ({
    key: i,
    size: 1 + (i % 3),
    top: `${1 + (i % 5)}%`,
    left: `${10 + (i * 8) % 85}%`,
    duration: 2 + (i % 3),
    delay: i * 0.3,
}));

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    key: i,
    size: 2 + (i % 3),
    top: `${10 + (i * 5) % 60}%`,
    left: `${20 + (i * 7) % 70}%`,
    duration: 4 + (i % 3),
    delay: i * 0.4,
}));

const SHOOTING_STARS = [
    { w: 100, top: '5%', delay: '0s', dur: '6s' },
    { w: 80, top: '3%', delay: '3s', dur: '8s' },
    { w: 60, top: '8%', delay: '7s', dur: '10s' }
];

export default function SolarWidget() {
    const { activePreset, setPreset, currentPreset, presets } = useSolarPresets();
    const [simSettings, setSimSettings] = useState({ ev: false, battery: true });

    const toggleEV = useCallback(() => setSimSettings(prev => ({ ...prev, ev: !prev.ev })), []);
    const toggleBattery = useCallback(() => setSimSettings(prev => ({ ...prev, battery: !prev.battery })), []);

    const calculatedData = useSolarData(currentPreset, simSettings);

    const baseUrl = window.PUBLIC_URL || process.env.PUBLIC_URL || '';


    useEffect(() => {
        Object.values(presets).forEach(preset => {
            const img = new Image();
            img.src = `${baseUrl}/assets/${preset.image}`;
        });
    }, [presets, baseUrl]);

    const isNightMode = activePreset === 'night' || activePreset === 'evening';
    const isMorning = activePreset === 'morning';
    const isAfternoon = activePreset === 'afternoon';

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden">
            <div className="relative w-full min-h-screen md:min-h-0 md:h-auto md:max-w-7xl md:aspect-video md:m-4 bg-black md:rounded-[2rem] shadow-2xl overflow-hidden md:border md:border-slate-700/50">

                {/* Backgrounds */}
                {presets.map((preset) => (
                    <BackgroundLayer key={preset.id} preset={preset} isActive={activePreset === preset.id} baseUrl={baseUrl} />
                ))}

                {/* Night Overlay */}
                <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isNightMode ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-[200%] h-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 25%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.08) 75%, transparent 100%)', animation: 'auroraMove 15s linear infinite' }} />
                    </div>
                    {SHOOTING_STARS.map((star, i) => (
                        <div key={i} className="absolute h-[1px]" style={{ width: `${star.w}px`, top: star.top, left: `-${star.w}px`, background: 'linear-gradient(90deg, transparent, white 50%, rgba(255,255,255,0.8))', boxShadow: `0 0 ${6 - i}px 1px rgba(255,255,255,${0.6 - i * 0.1})`, animation: `shootingStar${i + 1} ${star.dur} ease-in-out infinite`, animationDelay: star.delay }} />
                    ))}
                    <div className="absolute inset-0">
                        {STARS.map((star) => (
                            <div key={star.key} className="absolute rounded-full bg-white" style={{ width: `${star.size}px`, height: `${star.size}px`, top: star.top, left: star.left, animation: `starTwinkle ${star.duration}s ease-in-out infinite`, animationDelay: `${star.delay}s`, boxShadow: '0 0 4px rgba(255,255,255,0.8)' }} />
                        ))}
                    </div>
                </div>

                {/* Morning Overlay */}
                <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isMorning ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 100% at 100% 30%, rgba(251, 199, 61, 0.15) 0%, transparent 60%)', animation: 'morningGlow 4s ease-in-out infinite alternate' }} />
                    <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)', animation: 'mistRise 8s ease-in-out infinite' }} />
                    <div className="absolute top-0 right-0 w-[60%] h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(255,200,100,0.08) 50%, transparent 70%)', animation: 'softRays 6s ease-in-out infinite alternate' }} />
                </div>

                {/* Afternoon Overlay */}
                <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isAfternoon ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-[-20%] left-[30%] w-[300px] h-[500px]" style={{ background: 'conic-gradient(from 180deg, transparent 0deg, rgba(255,220,100,0.1) 15deg, transparent 30deg, transparent 50deg, rgba(255,220,100,0.08) 65deg, transparent 80deg, transparent 100deg, rgba(255,220,100,0.1) 115deg, transparent 130deg)', animation: 'sunRays 10s linear infinite' }} />
                    </div>
                    <div className="absolute inset-0">
                        {PARTICLES.map((p) => (
                            <div key={p.key} className="absolute rounded-full" style={{ width: `${p.size}px`, height: `${p.size}px`, background: 'rgba(255,230,150,0.6)', top: p.top, left: p.left, animation: `floatParticle ${p.duration}s ease-in-out infinite`, animationDelay: `${p.delay}s`, boxShadow: '0 0 6px rgba(255,220,100,0.5)' }} />
                        ))}
                    </div>
                    <div className="absolute top-[5%] left-[40%] w-[150px] h-[150px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,230,150,0.3) 0%, rgba(255,200,100,0.1) 40%, transparent 70%)', animation: 'lensFlare 3s ease-in-out infinite alternate' }} />
                </div>



                <TimeOfDaySelector presets={presets} activePreset={activePreset} onSelect={setPreset} />

                {/* iPhone Container */}
                <div className="absolute z-20 transition-all duration-500 left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[82vw] h-[82vh] max-w-[340px] max-h-[780px] md:inset-auto md:left-[5%] md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:w-[320px] md:h-[640px] md:max-h-[95vh] md:scale-[0.7] md:origin-left lg:scale-100 lg:origin-center lg:left-[5%] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:w-auto lg:h-[90%] lg:aspect-[9/19.5]">
                    <div className="relative w-full h-full bg-black overflow-hidden shadow-2xl rounded-[2.5rem] border-[6px] border-black ring-1 ring-white/10 lg:rounded-[3rem] lg:border-[8px] lg:ring-0">
                        <div className="absolute inset-0 z-50 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-50 hidden lg:block" />

                        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col font-sans select-none">
                            <div className="absolute inset-0 bg-[#0f172a]" />

                            {/* Dynamic Island */}
                            <div className="flex relative z-50 h-[34px] sm:h-[44px] justify-center items-center px-4 sm:px-6 pt-2 sm:pt-3">
                                <div className="w-[32%] h-[22px] sm:h-[28px] bg-black rounded-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 ring-1 ring-white/5 shadow-lg absolute left-1/2 -translate-x-1/2 top-2 sm:top-3">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#fbc73d] rounded-full animate-pulse shadow-[0_0_8px_#fbc73d]" />
                                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white/20 rounded-full" />
                                </div>
                            </div>

                            {/* Header */}
                            <div className="relative z-10 px-4 sm:px-3 md:px-5 mt-4 sm:mt-3 md:mt-5 mb-3 sm:mb-2 md:mb-5">
                                <div className="relative rounded-2xl sm:rounded-xl md:rounded-2xl p-4 sm:p-2.5 md:p-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                                    <div className="absolute top-0 left-2 sm:left-3 right-2 sm:right-3 h-[1px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent)' }} />
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-white text-lg sm:text-sm md:text-lg font-bold tracking-tight">My Energy</h2>
                                        <img src={`${baseUrl}/assets/Sunvolt_logo.webp`} alt="Sunvolt" className="h-7 sm:h-5 md:h-7 w-auto object-contain opacity-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Device Tiles */}
                            <div className="relative z-10 px-4 sm:px-3 md:px-5 grid grid-cols-2 gap-3 sm:gap-1.5 md:gap-3 mb-3 sm:mb-1.5 md:mb-2">
                                <DeviceTile icon={Car} label="EV Charger" isActive={simSettings.ev} onClick={toggleEV} />
                                <DeviceTile icon={Zap} label="Battery" isActive={simSettings.battery} onClick={toggleBattery} />
                            </div>

                            {/* Energy Chart */}
                            <div className="flex-1 relative w-full overflow-hidden">
                                <EnergyBarChart data={calculatedData} showBattery={simSettings.battery} />
                            </div>

                            {/* Home Indicator */}
                            <div className="pb-3 flex justify-center mt-auto">
                                <div className="w-20 h-1 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hotspots (Desktop Only) */}
                <div className="absolute inset-0 pointer-events-none z-30 desktop-only">
                    <Hotspot x={20.461} y={18.104} label="Battery 5.8 kWh" />
                    <Hotspot x={8} y={-12} label="Solar Panels 9.0 kWp" />
                    <Hotspot x={17.2} y={17} label="EV Charger 7.2 kW" />
                </div>
            </div>
        </div>
    );
}
