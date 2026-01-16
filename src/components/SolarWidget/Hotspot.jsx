
import { memo } from 'react';

const Hotspot = memo(({ x, y, label }) => (
    <div
        className="absolute pointer-events-auto group cursor-default select-none"
        style={{
            left: `${50 + x}%`,
            top: `${50 + y}%`,
            transform: 'translate(-50%, -50%)',
        }}
    >
        {/* Label - same style as TimeOfDaySelector buttons */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ willChange: 'opacity' }}>
            <div className="flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80">
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </div>
        </div>

        {/* Pulsing Dot */}
        <div className="relative z-20">
            <div className="absolute -inset-2 bg-[#fbc73d]/20 rounded-full animate-ping" />
            <div className="absolute -inset-1 bg-[#fbc73d]/30 rounded-full animate-pulse blur-sm" />
            <div className="w-3.5 h-3.5 bg-[#fbc73d] rounded-full border-2 border-white shadow-[0_0_15px_rgba(251,199,61,0.6)] group-hover:scale-125 transition-transform duration-300" />
        </div>
    </div>
));

Hotspot.displayName = 'Hotspot';

export default Hotspot;
