
import { useState, useEffect, useCallback, memo } from 'react';
import { useSolarPresets, useSolarData } from '../../hooks';

import IPhoneContainer from './IPhoneContainer';
import TimeOfDaySelector from './TimeOfDaySelector';
import Hotspot from './Hotspot';
import { NightOverlay, MorningOverlay } from './overlays';

const BackgroundLayer = memo(({ preset, isActive, baseUrl }) => (
    <div
        role="img"
        aria-label={`${preset.label} scene background`}
        aria-hidden={!isActive}
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'}`}
        style={{ backgroundImage: `url(${baseUrl}/${preset.image})` }}
    />
));
BackgroundLayer.displayName = 'BackgroundLayer';

export default function SolarWidget() {
    const { activePreset, setPreset, currentPreset, presets } = useSolarPresets();
    const [simSettings, setSimSettings] = useState({ ev: false, battery: true });

    const toggleEV = useCallback(() => setSimSettings(prev => ({ ...prev, ev: !prev.ev })), []);
    const toggleBattery = useCallback(() => setSimSettings(prev => ({ ...prev, battery: !prev.battery })), []);

    const calculatedData = useSolarData(currentPreset, simSettings);

    const baseUrl = window.PUBLIC_URL || process.env.PUBLIC_URL || '';

    // Preload images
    useEffect(() => {
        Object.values(presets).forEach(preset => {
            const img = new Image();
            img.src = `${baseUrl}/${preset.image}`;
        });
    }, [presets, baseUrl]);

    const isNightMode = activePreset === 'night' || activePreset === 'evening';
    const isMorning = activePreset === 'morning';

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden">
            <div className="relative w-full min-h-screen md:min-h-0 md:h-auto md:max-w-7xl md:aspect-video md:m-4 bg-black md:rounded-[2rem] shadow-2xl overflow-hidden md:border md:border-slate-700/50">

                {/* Backgrounds */}
                {presets.map((preset) => (
                    <BackgroundLayer key={preset.id} preset={preset} isActive={activePreset === preset.id} baseUrl={baseUrl} />
                ))}

                {/* Overlays */}
                <NightOverlay isActive={isNightMode} />
                <MorningOverlay isActive={isMorning} />

                <TimeOfDaySelector presets={presets} activePreset={activePreset} onSelect={setPreset} />

                <IPhoneContainer
                    presets={presets}
                    activePreset={activePreset}
                    setPreset={setPreset}
                    simSettings={simSettings}
                    toggleEV={toggleEV}
                    toggleBattery={toggleBattery}
                    calculatedData={calculatedData}
                    baseUrl={baseUrl}
                />

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
