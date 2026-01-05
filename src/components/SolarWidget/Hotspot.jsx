// Hotspot.jsx - Optimized interactive indicator
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
        {/* Label */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="px-5 py-3 rounded-[1.5rem] bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white min-w-[140px] text-center">
                <p className="text-sm font-semibold tracking-wide whitespace-nowrap">{label}</p>
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
