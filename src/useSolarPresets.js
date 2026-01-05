// useSolarPresets.js - Optimized solar simulation data
import { useState, useMemo, useCallback } from 'react';

const PRESETS = {
    morning: {
        id: 'morning',
        label: 'Morning',
        icon: 'SunRise',
        image: '/house_morning.webp',
        data: { pv: 2.1, load: 1.8, battery: 35, batteryState: 'charging', grid: 0 },
    },
    afternoon: {
        id: 'afternoon',
        label: 'Afternoon',
        icon: 'Sun',
        image: '/house_afternoon.webp',
        data: { pv: 7.2, load: 1.4, battery: 92, batteryState: 'charging', grid: -4.8 },
    },
    evening: {
        id: 'evening',
        label: 'Evening',
        icon: 'Sunset',
        image: '/house_evening.webp',
        data: { pv: 0.4, load: 4.5, battery: 65, batteryState: 'discharging', grid: 0 },
    },
    night: {
        id: 'night',
        label: 'Night',
        icon: 'Moon',
        image: '/house_night.webp',
        data: { pv: 0, load: 0.8, battery: 28, batteryState: 'discharging', grid: 0 },
    },
};

const PRESETS_ARRAY = Object.values(PRESETS);

export function useSolarPresets() {
    const [activePreset, setActivePreset] = useState('afternoon');

    const currentPreset = useMemo(() => PRESETS[activePreset], [activePreset]);

    const setPreset = useCallback((id) => {
        if (PRESETS[id]) setActivePreset(id);
    }, []);

    return {
        activePreset,
        setPreset,
        currentPreset,
        presets: PRESETS_ARRAY,
    };
}
