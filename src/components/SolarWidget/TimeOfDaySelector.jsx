// TimeOfDaySelector - External controls for selecting time preset
import { memo } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

const ICONS = {
    SunRise: Sunrise,
    Sun: Sun,
    Sunset: Sunset,
    Moon: Moon,
};

const TimeOfDaySelector = memo(({ presets, activePreset, onSelect }) => {
    return (
        <>
            {/* Mobile: Floating Glass Dock */}
            <div className="fixed md:hidden bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm">
                <div className="flex justify-between items-center gap-2 p-1.5 rounded-[2rem] border border-white/10 bg-[#19344d]/80 backdrop-blur-xl shadow-2xl">
                    {presets.map((preset) => {
                        const Icon = ICONS[preset.icon];
                        const isActive = activePreset === preset.id;
                        return (
                            <button
                                key={preset.id}
                                onClick={() => onSelect(preset.id)}
                                className={`flex flex-col items-center justify-center flex-1 py-3 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-[#fbc73d] text-[#19344d] scale-[1.05] shadow-[0_0_20px_rgba(251,199,61,0.5)]'
                                    : 'bg-white/5 text-white/60 hover:text-white/90'
                                    }`}
                            >
                                <Icon size={20} strokeWidth={2.5} className="mb-0.5" />
                                <span className="text-[9px] font-bold uppercase tracking-tighter">{preset.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Desktop: Vertical panel on right */}
            <div className="hidden md:block absolute right-[3%] top-1/2 -translate-y-1/2 z-50">
                <div className="flex flex-col gap-3 bg-slate-900/30 backdrop-blur-md p-2 rounded-[2rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    {presets.map((preset) => {
                        const Icon = ICONS[preset.icon];
                        const isActive = activePreset === preset.id;
                        return (
                            <button
                                key={preset.id}
                                onClick={() => onSelect(preset.id)}
                                className={`relative group flex items-center gap-3 px-5 py-3 rounded-[1.5rem] transition-all duration-500 ease-out cursor-pointer select-none ${isActive
                                    ? 'bg-[#fbc73d] text-[#19344d] shadow-[0_0_25px_rgba(251,199,61,0.5)] scale-105'
                                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <Icon size={20} strokeWidth={2.5} />
                                <span className="text-sm font-semibold tracking-wide">
                                    {preset.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
});

TimeOfDaySelector.displayName = 'TimeOfDaySelector';

export default TimeOfDaySelector;
