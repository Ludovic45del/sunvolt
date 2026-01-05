// useSolarData - Realistic energy flow calculations
import { useMemo } from 'react';

/**
 * Calculates realistic energy flows based on:
 * - Energy balance: PV + Grid + Battery = Load
 * - Priority: Solar covers load first, then battery, then grid
 * - EV charging adds significant load (7-11 kW)
 */
export function useSolarData(currentPreset, simSettings) {
    const calculatedData = useMemo(() => {
        if (!currentPreset?.data) {
            return {
                pv: 0,
                load: 0,
                battery: 0,
                batteryState: 'idle',
                grid: 0,
            };
        }

        // Clone base values from preset
        let { pv, load, battery, batteryState, grid } = { ...currentPreset.data };

        // --- MODIFIERS ---

        // 1. EV Charger adds 7.4 kW load (typical home charger)
        if (simSettings.ev) {
            load += 7.4;
        }

        // --- ENERGY BALANCE CALCULATION ---
        // Priority order: Solar -> Battery -> Grid

        const netDemand = load - pv; // Positive = need more, Negative = excess

        if (simSettings.battery) {
            if (netDemand > 0) {
                // Need more energy than solar provides
                // Battery can discharge up to 5 kW (Powerwall limit)
                const batteryPower = Math.min(netDemand, 5);
                const remainingDemand = netDemand - batteryPower;

                if (remainingDemand > 0) {
                    // Still need more -> import from grid
                    grid = remainingDemand;
                } else {
                    grid = 0;
                }
                batteryState = 'discharging';

                // Drain battery proportionally (rough simulation)
                battery = Math.max(0, battery - (batteryPower * 2));

            } else {
                // Excess solar energy
                const excess = Math.abs(netDemand);
                // Battery can charge up to 5 kW
                const batteryCharge = Math.min(excess, 5);
                const gridExport = excess - batteryCharge;

                grid = -gridExport; // Negative = export
                batteryState = battery < 100 ? 'charging' : 'idle';

                // Charge battery proportionally
                battery = Math.min(100, battery + (batteryCharge * 1.5));
            }
        } else {
            // No battery - direct grid interaction
            battery = 0;
            batteryState = 'idle';

            if (netDemand > 0) {
                grid = netDemand; // Import from grid
            } else {
                grid = netDemand; // Export to grid (negative)
            }
        }

        // Round values for cleaner display
        return {
            pv: Math.round(pv * 10) / 10,
            load: Math.round(load * 10) / 10,
            battery: Math.round(battery),
            batteryState,
            grid: Math.round(grid * 10) / 10,
        };
    }, [currentPreset, simSettings]);

    return calculatedData;
}
