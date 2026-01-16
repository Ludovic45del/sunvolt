
import { memo } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

const ICONS = { SunRise: Sunrise, Sun, Sunset, Moon };

const TimeOfDaySelector = memo(({ presets, activePreset, onSelect }) => (
    <nav aria-label="Time of day selector" className="desktop-only">
        {/* Desktop Panel - Vertical floating pills */}
        <div
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 desktop-only"
            role="group"
            aria-label="Time presets"
        >
            <div className="flex flex-col gap-2">
                {presets.map((preset) => {
                    const Icon = ICONS[preset.icon];
                    const isActive = activePreset === preset.id;
                    return (
                        <button
                            key={preset.id}
                            onClick={() => onSelect(preset.id)}
                            aria-pressed={isActive}
                            aria-label={`Select ${preset.label} time`}
                            className={`group flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full cursor-pointer select-none transition-all duration-500 ease-out ${isActive
                                ? 'bg-gradient-to-r from-[#fbc73d] to-[#f5a623] text-[#19344d] shadow-[0_0_20px_rgba(251,199,61,0.5),0_4px_15px_rgba(0,0,0,0.3)] scale-105 border border-[#fbc73d]/50'
                                : 'bg-black/40 backdrop-blur-md text-white/80 hover:bg-black/60 hover:scale-102 hover:shadow-lg border border-white/10 hover:border-white/20'
                                }`}
                            style={{
                                transform: isActive ? 'scale(1.05)' : undefined,
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            <Icon
                                size={18}
                                strokeWidth={2}
                                aria-hidden="true"
                                className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_rgba(25,52,77,0.5)]' : ''}`}
                            />
                            <span className={`text-sm font-semibold tracking-wide transition-all duration-500 ${isActive ? 'drop-shadow-sm' : ''}`}>
                                {preset.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    </nav>
));

TimeOfDaySelector.displayName = 'TimeOfDaySelector';

export default TimeOfDaySelector;
