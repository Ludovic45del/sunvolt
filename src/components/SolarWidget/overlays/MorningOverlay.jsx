// MorningOverlay.jsx - Morning time visual effects (glow, mist, rays)
import { memo } from 'react';

const MorningOverlay = memo(({ isActive }) => (
    <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        {/* Golden Glow */}
        <div
            className="absolute inset-0"
            style={{
                background: 'radial-gradient(ellipse 80% 100% at 100% 30%, rgba(251, 199, 61, 0.15) 0%, transparent 60%)',
                animation: 'morningGlow 4s ease-in-out infinite alternate'
            }}
        />

        {/* Rising Mist */}
        <div
            className="absolute bottom-0 left-0 right-0 h-[40%]"
            style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                animation: 'mistRise 8s ease-in-out infinite'
            }}
        />

        {/* Soft Rays */}
        <div
            className="absolute top-0 right-0 w-[60%] h-full overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(255,200,100,0.08) 50%, transparent 70%)',
                animation: 'softRays 6s ease-in-out infinite alternate'
            }}
        />
    </div>
));

MorningOverlay.displayName = 'MorningOverlay';

export default MorningOverlay;
