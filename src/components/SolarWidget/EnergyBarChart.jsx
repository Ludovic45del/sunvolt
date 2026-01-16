
import { memo, useMemo } from 'react';
import { Zap, Home, Sun, Battery } from 'lucide-react';
import { COLORS } from './constants';

const EnergyBarChart = memo(({ data, showBattery = true }) => {
    const bars = useMemo(() => {
        const result = [
            {
                id: 'grid',
                label: 'Grid',
                value: Math.abs(data.grid),
                unit: 'kW',
                color: data.grid < 0 ? COLORS.GRID_EXPORT : COLORS.GRID_IMPORT,
                icon: Zap,
                subtitle: data.grid < 0 ? 'Export' : 'Import',
            },
            {
                id: 'usage',
                label: 'Usage',
                value: data.load,
                unit: 'kW',
                color: COLORS.USAGE,
                icon: Home,
                subtitle: 'Home',
            },
            {
                id: 'solar',
                label: 'Solar',
                value: data.pv,
                unit: 'kW',
                color: COLORS.SOLAR,
                icon: Sun,
                subtitle: 'Production',
            },
        ];

        if (showBattery) {
            const batteryColor = data.batteryState === 'charging'
                ? COLORS.BATTERY_CHARGING
                : data.batteryState === 'discharging'
                    ? COLORS.BATTERY_DISCHARGING
                    : COLORS.BATTERY_IDLE;

            result.push({
                id: 'battery',
                label: 'Battery',
                value: data.battery,
                unit: '%',
                color: batteryColor,
                icon: Battery,
                subtitle: data.batteryState === 'charging' ? 'Charging' : data.batteryState === 'discharging' ? 'Discharging' : 'Idle',
            });
        }

        return result;
    }, [data, showBattery]);

    const maxValue = useMemo(() => {
        const values = [Math.abs(data.grid), data.load, data.pv, showBattery ? (data.battery / 100) * 5 : 0];
        return Math.max(...values, 1);
    }, [data, showBattery]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-2 py-1">
            {/* Bars - tighter spacing, wider bars */}
            <div className={`relative flex-1 flex items-stretch -translate-x-2 ${showBattery ? 'justify-center gap-3' : 'justify-center gap-4'}`}>
                {bars.map((bar) => {
                    const Icon = bar.icon;
                    const rawPercent = bar.id === 'battery' ? bar.value : (bar.value / maxValue) * 100;
                    // Cap at 85% to fill more space and maintain 15% minimum
                    const heightPercent = Math.min(Math.max(rawPercent, 15), 85);

                    return (
                        <div key={bar.id} className="flex flex-col items-center h-full" style={{ width: showBattery ? '22%' : '28%' }}>
                            {/* Value - balanced size */}
                            <div className="mb-0.5 text-center px-1.5 py-0.5 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                <span className="text-white text-sm font-bold">{bar.value.toFixed(1)}</span>
                                <span className="text-slate-300 text-[10px] ml-0.5">{bar.unit}</span>
                            </div>

                            {/* Bar - capped height */}
                            <div className="w-full flex-1 flex items-end justify-center">
                                <div
                                    className="w-full max-w-[32px] rounded-lg transition-all duration-700 ease-out relative overflow-hidden"
                                    style={{
                                        height: `${heightPercent}%`,
                                        background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}BB 100%)`,
                                        boxShadow: `0 0 12px ${bar.color}40`,
                                    }}
                                >
                                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, transparent 100%)' }} />
                                </div>
                            </div>

                            {/* Icon & Label - closer to bar */}
                            <div className="mt-1 flex flex-col items-center">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5"
                                    style={{
                                        background: `linear-gradient(135deg, ${bar.color}30 0%, ${bar.color}15 100%)`,
                                        border: `1.5px solid ${bar.color}60`,
                                    }}
                                >
                                    <Icon size={16} style={{ color: bar.color }} />
                                </div>
                                <span className="text-[10px] font-semibold text-white uppercase tracking-wide">{bar.label}</span>
                                <span className="text-[9px] text-slate-300">{bar.subtitle}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

EnergyBarChart.displayName = 'EnergyBarChart';

export default EnergyBarChart;
