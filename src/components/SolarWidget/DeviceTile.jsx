
import { memo } from 'react';

const DeviceTile = memo(({
    icon: Icon,
    label,
    isActive,
    onClick,
    activeColor = 'bg-[#fbc73d]',
    activeTextColor = 'text-[#19344d]',
}) => (
    <div
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        aria-label={`${label}: ${isActive ? 'Active' : 'Standby'}. Click to toggle.`}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        className={`
            relative h-20
            rounded-2xl sm:rounded-xl md:rounded-2xl p-3 sm:p-2 md:p-3
            flex flex-col justify-between cursor-pointer overflow-hidden group
            transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#fbc73d]/50
            ${isActive
                ? `${activeColor} ${activeTextColor} border border-white/30`
                : 'text-slate-300 border border-white/10 hover:border-white/20'
            }`}
        style={isActive ? {
            boxShadow: '0 8px 32px rgba(251, 199, 61, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        } : {
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}
    >
        {/* Top Highlight */}
        <div
            className="absolute top-0 left-2 right-2 h-[1px] pointer-events-none"
            style={{
                background: isActive
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.6) 70%, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent)'
            }}
        />

        <div className="flex justify-between items-start relative z-10">
            <Icon
                size={18}
                className={`md:w-[22px] md:h-[22px] transition-all duration-300 ${isActive ? activeTextColor : 'text-slate-400 group-hover:text-white'}`}
            />
            {/* Toggle Switch */}
            <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-all duration-300 ${isActive ? 'bg-[#19344d]/30 justify-end' : 'bg-slate-600 justify-start'}`}>
                <div className={`w-4 h-4 rounded-full shadow-md transition-all duration-300 ${isActive ? 'bg-white' : 'bg-slate-300'}`} />
            </div>
        </div>

        <div className="relative z-10">
            <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${isActive ? 'opacity-80' : 'opacity-60 group-hover:opacity-90'} transition-opacity duration-300`}>
                {label}
            </span>
            <div className="text-xs md:text-[13px] font-semibold leading-tight">
                {isActive ? 'Active' : 'Standby'}
            </div>
        </div>
    </div>
));

DeviceTile.displayName = 'DeviceTile';

export default DeviceTile;
