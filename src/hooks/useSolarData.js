// useSolarData.js - Optimized energy flow calculations
import { useMemo } from 'react';

const BATTERY_POWER_LIMIT = 5; // kW
const EV_CHARGER_POWER = 7.4; // kW

const DEFAULT_DATA = {
    pv: 0,
    load: 0,
    battery: 0,
    batteryState: 'idle',
    grid: 0,
};

export function useSolarData(currentPreset, simSettings) {
    return useMemo(() => {
        if (!currentPreset?.data) return DEFAULT_DATA;

        let { pv, load, battery, batteryState, grid } = currentPreset.data;

        // EV Charger adds load
        if (simSettings.ev) load += EV_CHARGER_POWER;

        const netDemand = load - pv;

        if (simSettings.battery) {
            if (netDemand > 0) {
                const batteryPower = Math.min(netDemand, BATTERY_POWER_LIMIT);
                grid = Math.max(0, netDemand - batteryPower);
                batteryState = 'discharging';
                battery = Math.max(0, battery - batteryPower * 2);
            } else {
                const excess = -netDemand;
                const batteryCharge = Math.min(excess, BATTERY_POWER_LIMIT);
                grid = -(excess - batteryCharge);
                batteryState = battery < 100 ? 'charging' : 'idle';
                battery = Math.min(100, battery + batteryCharge * 1.5);
            }
        } else {
            battery = 0;
            batteryState = 'idle';
            grid = netDemand;
        }

        return {
            pv: Math.round(pv * 10) / 10,
            load: Math.round(load * 10) / 10,
            battery: Math.round(battery),
            batteryState,
            grid: Math.round(grid * 10) / 10,
        };
    }, [currentPreset, simSettings]);
}
