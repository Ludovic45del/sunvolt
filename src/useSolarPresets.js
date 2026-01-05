// useSolarPresets.js - Realistic solar simulation data
import { useState, useMemo } from 'react';

/**
 * Realistic solar system simulation based on:
 * - 9 kWp solar array (typical residential)
 * - 2x Powerwall (27 kWh total capacity)
 * - Average household consumption: 1-5 kW depending on time of day
 * - Grid: negative = export, positive = import
 */

const PRESETS = {
    morning: {
        id: 'morning',
        label: 'Morning',
        icon: 'SunRise',
        image: '/house_morning.png',
        data: {
            pv: 2.1,          // Solar starting up (7:00-9:00 AM)
            load: 1.8,        // Morning routine: coffee, lights, devices
            battery: 35,      // Drained overnight, starting to charge
            batteryState: 'charging',
            grid: 0,          // Balanced: PV covers load, excess charges battery
        },
    },
    afternoon: {
        id: 'afternoon',
        label: 'Afternoon',
        icon: 'Sun',
        image: '/house_afternoon.png',
        data: {
            pv: 7.2,          // Peak solar production (12:00-2:00 PM)
            load: 1.4,        // Low usage: nobody home or light usage
            battery: 92,      // Nearly full
            batteryState: 'charging',
            grid: -4.8,       // Exporting excess to grid (selling)
        },
    },
    evening: {
        id: 'evening',
        label: 'Evening',
        icon: 'Sunset',
        image: '/house_evening.png',
        data: {
            pv: 0.4,          // Sun setting (6:00-8:00 PM)
            load: 4.5,        // Peak usage: cooking, TV, heating/AC
            battery: 65,      // Discharging to cover load
            batteryState: 'discharging',
            grid: 0,          // Battery covers the gap
        },
    },
    night: {
        id: 'night',
        label: 'Night',
        icon: 'Moon',
        image: '/house_night.png',
        data: {
            pv: 0,            // No solar (10:00 PM - 6:00 AM)
            load: 0.8,        // Base load: fridge, standby devices
            battery: 28,      // Low after evening peak
            batteryState: 'discharging',
            grid: 0,          // Battery still covers base load
        },
    },
};

export function useSolarPresets() {
    const [activePreset, setActivePreset] = useState('afternoon');

    const currentPreset = useMemo(() => PRESETS[activePreset], [activePreset]);
    const presets = useMemo(() => Object.values(PRESETS), []);

    const setPreset = (id) => {
        if (PRESETS[id]) {
            setActivePreset(id);
        }
    };

    return {
        activePreset,
        setPreset,
        currentPreset,
        presets,
    };
}
