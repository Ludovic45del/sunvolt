// IPhoneContainer.jsx - The main device mockup container
import { memo } from 'react';
import { Car, Zap } from 'lucide-react';
import EnergyBarChart from './EnergyBarChart';
import DeviceTile from './DeviceTile';
import Hotspot from './Hotspot';

const IPhoneContainer = memo(({
    presets,
    activePreset,
    setPreset,
    simSettings,
    toggleEV,
    toggleBattery,
    calculatedData,
    baseUrl
}) => (
    <div className="absolute z-20 transition-all duration-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78vw] h-[75vh] max-w-[340px] max-h-[700px] md:inset-auto md:left-[5%] md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:w-[320px] md:h-[640px] md:max-h-[95vh] md:scale-[0.7] md:origin-left lg:scale-100 lg:origin-center lg:left-[5%] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:w-auto lg:h-[85%] lg:aspect-[9/19.5]">
        <div className="relative w-full h-full bg-black overflow-hidden shadow-2xl rounded-[2.5rem] border-[8px] border-black ring-4 ring-black/80 lg:rounded-[3rem] lg:border-[10px]">
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
                <div className="relative z-10 px-4 mt-2 mb-3">
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <h2 className="text-white text-base font-bold tracking-tight">My Energy</h2>
                        <img src={`${baseUrl}/Sunvolt_logo.webp`} alt="Sunvolt" className="h-6 w-auto object-contain" />
                    </div>
                </div>

                {/* Device Tiles */}
                <div className="relative z-10 px-4 grid grid-cols-2 gap-2 mb-2">
                    <DeviceTile icon={Car} label="EV Charger" isActive={simSettings.ev} onClick={toggleEV} />
                    <DeviceTile icon={Zap} label="Battery" isActive={simSettings.battery} onClick={toggleBattery} />
                </div>

                {/* Energy Chart */}
                <div className="h-[45%] relative w-full overflow-visible mt-2">
                    <EnergyBarChart data={calculatedData} showBattery={simSettings.battery} />
                </div>

                {/* Spacer - flexible on desktop, fixed on mobile */}
                <div className="h-4 md:flex-1" />

                {/* Mobile Time Selector - Premium buttons without container */}
                <div className="relative z-10 px-4 mt-4 mb-4 mobile-only">
                    <div className="flex justify-between gap-3">
                        {presets.map((preset) => {
                            const isActive = activePreset === preset.id;
                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => setPreset(preset.id)}
                                    className={`flex-1 py-2.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-500 ${isActive
                                        ? 'bg-gradient-to-r from-[#fbc73d] to-[#f5a623] text-[#19344d] shadow-[0_0_15px_rgba(251,199,61,0.4)]'
                                        : 'bg-black/30 backdrop-blur-md text-white/70 active:scale-95'
                                        }`}
                                    style={{
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                >
                                    {preset.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Home Indicator - desktop/tablet only */}
                <div className="absolute bottom-2 left-0 right-0 z-50 hidden md:flex justify-center">
                    <div className="w-32 h-1.5 bg-white/60 rounded-full" />
                </div>
            </div>
        </div>
    </div>
));

IPhoneContainer.displayName = 'IPhoneContainer';

export default IPhoneContainer;
