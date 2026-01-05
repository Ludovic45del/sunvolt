// SolarWidget - Main component
import { useState, useEffect, useCallback } from 'react';
import { Car, Zap } from 'lucide-react';

import { useSolarPresets } from '../../useSolarPresets';
import { useSolarData } from '../../hooks/useSolarData';

import EnergyBarChart from './EnergyBarChart';
import DeviceTile from './DeviceTile';
import TimeOfDaySelector from './TimeOfDaySelector';
import Hotspot from './Hotspot';

export default function SolarWidget() {
    const { activePreset, setPreset, currentPreset, presets } = useSolarPresets();

    // Simulation state
    const [simSettings, setSimSettings] = useState({ ev: false, battery: true });

    // Memoized toggle functions for better performance
    const toggleEV = useCallback(() => {
        setSimSettings(prev => ({ ...prev, ev: !prev.ev }));
    }, []);

    const toggleBattery = useCallback(() => {
        setSimSettings(prev => ({ ...prev, battery: !prev.battery }));
    }, []);

    // Calculated energy data
    const calculatedData = useSolarData(currentPreset, simSettings);

    // Preload background images
    useEffect(() => {
        presets.forEach(preset => {
            const img = new Image();
            img.src = preset.image;
        });
    }, [presets]);

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden">
            {/* 
                RESPONSIVE LAYOUT:
                - Mobile (< 640px): Full screen phone-only view
                - Tablet/Desktop (>= 640px): Panoramic card with phone + background
            */}
            <div className="relative w-full min-h-screen md:min-h-0 md:h-auto md:max-w-7xl md:aspect-video md:m-4 bg-black md:rounded-[2rem] shadow-2xl overflow-hidden md:border md:border-slate-700/50">

                {/* Background Layers */}
                {presets.map((preset) => (
                    <div
                        key={preset.id}
                        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${activePreset === preset.id ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'}`}
                        style={{
                            backgroundImage: `url(${preset.image})`,
                            willChange: activePreset === preset.id ? 'opacity, transform' : 'auto'
                        }}
                    />
                ))}

                {/* Animated Night Sky Overlay */}
                <div
                    className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${activePreset === 'night' || activePreset === 'evening' ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Moving Aurora Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute w-[200%] h-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 25%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.08) 75%, transparent 100%)',
                                animation: 'auroraMove 15s linear infinite',
                                willChange: 'transform'
                            }}
                        />
                    </div>

                    {/* Shooting Stars optimized */}
                    {[
                        { w: 100, top: '5%', delay: '0s', dur: '6s' },
                        { w: 80, top: '3%', delay: '3s', dur: '8s' },
                        { w: 60, top: '8%', delay: '7s', dur: '10s' }
                    ].map((star, i) => (
                        <div
                            key={i}
                            className="absolute h-[1px]"
                            style={{
                                width: `${star.w}px`,
                                top: star.top,
                                left: `-${star.w}px`,
                                background: 'linear-gradient(90deg, transparent, white 50%, rgba(255,255,255,0.8))',
                                boxShadow: `0 0 ${6 - i}px 1px rgba(255,255,255,${0.6 - i * 0.1})`,
                                animation: `shootingStar${i + 1} ${star.dur} ease-in-out infinite`,
                                animationDelay: star.delay,
                                willChange: 'transform'
                            }}
                        />
                    ))}

                    {/* Twinkling Stars Field */}
                    <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-white"
                                style={{
                                    width: `${1 + (i % 3)}px`,
                                    height: `${1 + (i % 3)}px`,
                                    top: `${1 + (i % 5)}%`,
                                    left: `${10 + (i * 8) % 85}%`,
                                    animation: `starTwinkle ${2 + (i % 3)}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                    boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                                    willChange: 'opacity, transform'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Morning Animated Overlay */}
                <div
                    className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${activePreset === 'morning' ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Warm golden glow from right */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse 80% 100% at 100% 30%, rgba(251, 199, 61, 0.15) 0%, transparent 60%)',
                            animation: 'morningGlow 4s ease-in-out infinite alternate'
                        }}
                    />
                    {/* Rising mist effect */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[40%]"
                        style={{
                            background: 'linear-gradient(to top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                            animation: 'mistRise 8s ease-in-out infinite'
                        }}
                    />
                    {/* Soft light rays */}
                    <div
                        className="absolute top-0 right-0 w-[60%] h-full overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, transparent 30%, rgba(255,200,100,0.08) 50%, transparent 70%)',
                            animation: 'softRays 6s ease-in-out infinite alternate'
                        }}
                    />
                </div>

                {/* Afternoon Animated Overlay */}
                <div
                    className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${activePreset === 'afternoon' ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Sun rays from top */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-[-20%] left-[30%] w-[300px] h-[500px]"
                            style={{
                                background: 'conic-gradient(from 180deg, transparent 0deg, rgba(255,220,100,0.1) 15deg, transparent 30deg, transparent 50deg, rgba(255,220,100,0.08) 65deg, transparent 80deg, transparent 100deg, rgba(255,220,100,0.1) 115deg, transparent 130deg)',
                                animation: 'sunRays 10s linear infinite',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                    {/* Floating particles */}
                    <div className="absolute inset-0">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${2 + (i % 3)}px`,
                                    height: `${2 + (i % 3)}px`,
                                    background: 'rgba(255,230,150,0.6)',
                                    top: `${10 + (i * 5) % 60}%`,
                                    left: `${20 + (i * 7) % 70}%`,
                                    animation: `floatParticle ${4 + (i % 3)}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.4}s`,
                                    boxShadow: '0 0 6px rgba(255,220,100,0.5)',
                                    willChange: 'transform, opacity'
                                }}
                            />
                        ))}
                    </div>
                    {/* Warm lens flare */}
                    <div
                        className="absolute top-[5%] left-[40%] w-[150px] h-[150px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,230,150,0.3) 0%, rgba(255,200,100,0.1) 40%, transparent 70%)',
                            animation: 'lensFlare 3s ease-in-out infinite alternate'
                        }}
                    />
                </div>

                {/* All Sky Animations */}
                <style>{`
                    @keyframes auroraMove {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0%); }
                    }
                    @keyframes shootingStar1 {
                        0%, 90%, 100% { transform: translateX(0) translateY(0); opacity: 0; }
                        5% { opacity: 1; }
                        20% { transform: translateX(calc(100vw + 200px)) translateY(80px); opacity: 0; }
                    }
                    @keyframes shootingStar2 {
                        0%, 85%, 100% { transform: translateX(0) translateY(0); opacity: 0; }
                        5% { opacity: 1; }
                        25% { transform: translateX(calc(80vw + 150px)) translateY(60px); opacity: 0; }
                    }
                    @keyframes shootingStar3 {
                        0%, 80%, 100% { transform: translateX(0) translateY(0); opacity: 0; }
                        3% { opacity: 1; }
                        18% { transform: translateX(calc(70vw + 100px)) translateY(50px); opacity: 0; }
                    }
                    @keyframes starTwinkle {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes morningGlow {
                        0% { opacity: 0.6; }
                        100% { opacity: 1; }
                    }
                    @keyframes mistRise {
                        0%, 100% { transform: translateY(0); opacity: 0.8; }
                        50% { transform: translateY(-20px); opacity: 0.4; }
                    }
                    @keyframes softRays {
                        0% { opacity: 0.5; transform: translateX(-10px); }
                        100% { opacity: 1; transform: translateX(10px); }
                    }
                    @keyframes sunRays {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes floatParticle {
                        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
                        25% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
                        50% { transform: translateY(-25px) translateX(-5px); opacity: 0.6; }
                        75% { transform: translateY(-10px) translateX(8px); opacity: 0.9; }
                    }
                    @keyframes lensFlare {
                        0% { opacity: 0.5; transform: scale(0.9); }
                        100% { opacity: 0.9; transform: scale(1.1); }
                    }
                `}</style>

                {/* Time of Day Selector */}
                <TimeOfDaySelector
                    presets={presets}
                    activePreset={activePreset}
                    onSelect={setPreset}
                />

                {/* 
                    WIDGET CONTAINER STRATEGY:
                    - Mobile: Floating Glass Card centered on screen (background visible around it)
                    - Desktop: iPhone Mockup positioned in the dashboard scene
                */}
                <div className={`
                    absolute z-20 transition-all duration-500
                    /* Mobile: Floating Phone in Landscape */
                    left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2
                    w-[92vw] h-[78vh] max-w-[360px] max-h-[720px] md:inset-auto 
                    
                    /* Tablet: Positioned Left */
                    md:left-[5%] md:top-1/2 md:translate-x-0 md:-translate-y-1/2
                    md:w-[320px] md:h-[640px] md:max-h-[95vh]
                    md:scale-[0.7] md:origin-left
                    
                    /* Desktop: Positioned iPhone */
                    lg:scale-100 lg:origin-center
                    lg:left-[5%] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:w-auto lg:h-[90%] lg:aspect-[9/19.5]
                `}>
                    <div className={`
                        relative w-full h-full bg-black overflow-hidden shadow-2xl
                        /* iPhone-style Frame (All sizes) */
                        rounded-[2.5rem] border-[6px] border-black ring-1 ring-white/10
                        
                        /* Premium Tablet/Desktop Refinements */
                        lg:rounded-[3rem] lg:border-[8px] lg:ring-0
                    `}>
                        {/* Desktop-only: Screen reflections */}
                        <div className="absolute inset-0 z-50 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-50 hidden lg:block" />

                        {/* App Screen */}
                        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col font-sans select-none">

                            {/* App Background */}
                            <div className="absolute inset-0 bg-[#0f172a]" />

                            {/* Dynamic Island */}
                            <div className="flex relative z-50 h-[34px] sm:h-[44px] justify-center items-center px-4 sm:px-6 pt-2 sm:pt-3">
                                <div className="w-[32%] h-[22px] sm:h-[28px] bg-black rounded-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 ring-1 ring-white/5 shadow-lg absolute left-1/2 -translate-x-1/2 top-2 sm:top-3">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#fbc73d] rounded-full animate-pulse shadow-[0_0_8px_#fbc73d]" />
                                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white/20 rounded-full" />
                                </div>
                            </div>

                            {/* Header Content */}
                            <div className="relative z-10 px-4 sm:px-3 md:px-5 mt-4 sm:mt-3 md:mt-5 mb-3 sm:mb-2 md:mb-5">
                                <div
                                    className="relative rounded-2xl sm:rounded-xl md:rounded-2xl p-4 sm:p-2.5 md:p-4 overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-2 sm:left-3 right-2 sm:right-3 h-[1px] pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent)'
                                        }}
                                    />
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-white text-lg sm:text-sm md:text-lg font-bold tracking-tight drop-shadow-lg">My Energy</h2>
                                        <img src="/Sunvolt_logo.png" alt="Sunvolt Logo" className="h-7 sm:h-5 md:h-7 w-auto object-contain opacity-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Device Tiles */}
                            <div className="relative z-10 px-4 sm:px-3 md:px-5 grid grid-cols-2 gap-3 sm:gap-1.5 md:gap-3 mb-3 sm:mb-1.5 md:mb-2">
                                <DeviceTile
                                    icon={Car}
                                    label="EV Charger"
                                    isActive={simSettings.ev}
                                    onClick={toggleEV}
                                    activeColor="bg-[#fbc73d]"
                                    activeTextColor="text-[#19344d]"
                                    activeShadow="shadow-[0_5px_20px_rgba(251,199,61,0.3)]"
                                />
                                <DeviceTile
                                    icon={Zap}
                                    label="Battery"
                                    isActive={simSettings.battery}
                                    onClick={toggleBattery}
                                />
                            </div>

                            {/* Energy Bar Chart */}
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

                {/* Hotspot Layer - Tablet+ */}
                <div className="hidden md:block absolute inset-0 pointer-events-none z-30">
                    <Hotspot x={20.461} y={18.104} label="Battery 5.8 kWh" />
                    <Hotspot x={8} y={-12} label="Solar Panels 9.0 kWp" />
                    <Hotspot x={17.2} y={17} label="EV Charger 7.2 kW" />
                </div>
            </div>
        </div>
    );
}
