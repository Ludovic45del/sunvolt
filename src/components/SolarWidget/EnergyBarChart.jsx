// EnergyBarChart - Vertical bar chart for energy data visualization
// Enhanced with Liquid Glass Effect
import { memo } from 'react';
import { Zap, Home, Sun, Battery } from 'lucide-react';
import { BRAND } from './constants';

const EnergyBarChart = memo(({ data, showBattery = true }) => {
    // Calculate max value for scaling
    const values = [
        Math.abs(data.grid),
        data.load,
        data.pv,
        showBattery ? (data.battery / 100) * 5 : 0,
    ];
    const maxValue = Math.max(...values, 1);

    const bars = [
        {
            id: 'grid',
            label: 'Grid',
            value: Math.abs(data.grid),
            unit: 'kW',
            color: data.grid < 0 ? '#22c55e' : '#ef4444',
            icon: Zap,
            subtitle: data.grid < 0 ? 'Export' : 'Import',
        },
        {
            id: 'usage',
            label: 'Usage',
            value: data.load,
            unit: 'kW',
            color: '#8b5cf6',
            icon: Home,
            subtitle: 'Home',
        },
        {
            id: 'solar',
            label: 'Solar',
            value: data.pv,
            unit: 'kW',
            color: BRAND.YELLOW,
            icon: Sun,
            subtitle: 'Production',
        },
    ];

    if (showBattery) {
        bars.push({
            id: 'battery',
            label: 'Battery',
            value: data.battery,
            unit: '%',
            color: data.batteryState === 'discharging' ? '#ef4444' : '#22c55e',
            icon: Battery,
            subtitle: data.batteryState === 'charging' ? 'Charging' : data.batteryState === 'discharging' ? 'Discharging' : 'Idle',
        });
    }

    return (
        <div className="w-full h-full flex flex-col px-3 sm:px-2 md:px-3 py-2 sm:py-3 md:py-4">
            {/* Liquid Glass Container */}
            <div
                className="relative flex-1 flex flex-col rounded-2xl md:rounded-3xl pt-4 md:pt-6 pb-3 md:pb-4 px-3 md:px-4 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
                    `
                }}
            >
                {/* Top Liquid Highlight */}
                <div
                    className="absolute top-0 left-4 right-4 h-[1px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.25) 80%, transparent)'
                    }}
                />

                {/* Subtle Inner Glow */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)'
                    }}
                />

                {/* Chart Content */}
                <div className="relative flex-1 min-h-[160px] flex justify-around gap-2 sm:gap-1 md:gap-2">
                    {bars.map((bar) => {
                        const Icon = bar.icon;
                        const heightPercent = bar.id === 'battery'
                            ? (bar.value / 100) * 100
                            : (bar.value / maxValue) * 100;

                        return (
                            <div key={bar.id} className="flex flex-col items-center flex-1 z-10 group h-full">
                                {/* Value Label */}
                                <div className="mb-1 md:mb-2 text-center">
                                    <span className="text-white text-base md:text-lg font-bold drop-shadow-lg">{bar.value.toFixed(1)}</span>
                                    <span className="text-slate-400 text-[10px] md:text-xs ml-0.5 md:ml-1">{bar.unit}</span>
                                </div>

                                {/* Glass Bar Container */}
                                <div className="w-full flex-1 flex items-end justify-center pb-2">
                                    <div
                                        className="w-8 md:w-10 rounded-lg md:rounded-xl transition-all duration-700 ease-out relative overflow-hidden"
                                        style={{
                                            height: `${Math.max(heightPercent, 10)}%`,
                                            background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}CC 100%)`,
                                            boxShadow: `
                                                0 0 30px ${bar.color}60,
                                                0 0 60px ${bar.color}30,
                                                inset 0 1px 0 rgba(255,255,255,0.3)
                                            `,
                                            willChange: 'height'
                                        }}
                                    >
                                        {/* Bar Inner Shine */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 30%, transparent 70%)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Glass Icon Circle */}
                                <div className="mt-2 md:mt-3 flex flex-col items-center">
                                    <div
                                        className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center mb-0.5 md:mb-1 relative overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${bar.color}40 0%, ${bar.color}20 100%)`,
                                            backdropFilter: 'blur(8px)',
                                            border: `1px solid ${bar.color}50`,
                                            boxShadow: `0 0 20px ${bar.color}40`
                                        }}
                                    >
                                        {/* Icon highlight */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                                                borderRadius: '50% 50% 0 0'
                                            }}
                                        />
                                        <Icon size={14} className="md:w-[18px] md:h-[18px]" style={{ color: bar.color, filter: `drop-shadow(0 0 4px ${bar.color})` }} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wide drop-shadow-md">{bar.label}</span>
                                    <span className="text-[8px] md:text-[9px] text-slate-400">{bar.subtitle}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

EnergyBarChart.displayName = 'EnergyBarChart';

export default EnergyBarChart;
