
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
                            className={`group flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none ${isActive
                                ? 'bg-[#fbc73d] text-[#19344d] shadow-lg'
                                : 'bg-black/30 backdrop-blur-md text-white/80 hover:bg-black/50 border border-white/10'
                                }`}
                        >
                            <Icon size={18} strokeWidth={2} aria-hidden="true" />
                            <span className="text-sm font-medium">{preset.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    </nav>
));

TimeOfDaySelector.displayName = 'TimeOfDaySelector';

export default TimeOfDaySelector;
