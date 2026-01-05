// Hotspot - Memoized interactive indicator component
import { memo } from 'react';

const Hotspot = memo(({ x, y, label }) => {
    return (
        <div
            className="absolute pointer-events-auto group cursor-default select-none"
            style={{
                left: `${50 + x}%`,
                top: `${50 + y}%`,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform'
            }}
        >
            {/* Liquid Glass Label - Same as TimeOfDaySelector */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" style={{ willChange: 'opacity' }}>
                <div className="px-5 py-3 rounded-[1.5rem] bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white flex items-center justify-center min-w-[140px]">
                    <p className="text-sm font-semibold tracking-wide whitespace-nowrap">{label}</p>
                </div>
            </div>

            {/* Pulsing Core (Yellow Dot) */}
            <div className="relative z-20">
                <div className="absolute -inset-2 bg-[#fbc73d]/20 rounded-full animate-ping duration-1000" />
                <div className="absolute -inset-1 bg-[#fbc73d]/30 rounded-full animate-pulse blur-sm" />
                <div className="w-3.5 h-3.5 bg-[#fbc73d] rounded-full border-2 border-white shadow-[0_0_15px_rgba(251,199,61,0.6)] group-hover:scale-125 transition-transform duration-300" style={{ willChange: 'transform' }} />
            </div>
        </div>
    );
});

Hotspot.displayName = 'Hotspot';

export default Hotspot;
