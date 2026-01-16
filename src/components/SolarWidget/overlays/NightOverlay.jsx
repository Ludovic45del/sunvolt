// NightOverlay.jsx - Night time visual effects (aurora, stars, shooting stars)
import { memo } from 'react';
import { STARS, SHOOTING_STARS } from '../constants';

const NightOverlay = memo(({ isActive }) => (
    <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        {/* Aurora Effect */}
        <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute w-[200%] h-full"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 25%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.08) 75%, transparent 100%)',
                    animation: 'auroraMove 15s linear infinite'
                }}
            />
        </div>

        {/* Shooting Stars */}
        {SHOOTING_STARS.map((star, i) => (
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
                    animationDelay: star.delay
                }}
            />
        ))}

        {/* Twinkling Stars */}
        <div className="absolute inset-0">
            {STARS.map((star) => (
                <div
                    key={star.key}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        top: star.top,
                        left: star.left,
                        animation: `starTwinkle ${star.duration}s ease-in-out infinite`,
                        animationDelay: `${star.delay}s`,
                        boxShadow: '0 0 4px rgba(255,255,255,0.8)'
                    }}
                />
            ))}
        </div>
    </div>
));

NightOverlay.displayName = 'NightOverlay';

export default NightOverlay;
