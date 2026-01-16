// SolarWidget Constants - Centralized configuration
// ================================================

// Brand Colors
export const BRAND = {
    BLUE: '#19344d',
    YELLOW: '#fbc73d',
    YELLOW_LIGHT: '#f5a623',
    DARK_BLUE: '#0f172a',
};

// Energy Bar Colors
export const COLORS = {
    // Grid
    GRID_EXPORT: '#10b981',
    GRID_IMPORT: '#3b82f6',

    // Usage
    USAGE: '#8b5cf6',

    // Solar
    SOLAR: BRAND.YELLOW,

    // Battery States
    BATTERY_CHARGING: '#10b981',
    BATTERY_DISCHARGING: '#f97316',
    BATTERY_IDLE: '#6b7280',
};

// Night Effect - Twinkling Stars
export const STARS = Array.from({ length: 12 }, (_, i) => ({
    key: i,
    size: 1 + (i % 3),
    top: `${1 + (i % 5)}%`,
    left: `${10 + (i * 8) % 85}%`,
    duration: 2 + (i % 3),
    delay: i * 0.3,
}));

// Night Effect - Shooting Stars
export const SHOOTING_STARS = [
    { w: 100, top: '5%', delay: '0s', dur: '6s' },
    { w: 80, top: '3%', delay: '3s', dur: '8s' },
    { w: 60, top: '8%', delay: '7s', dur: '10s' },
];

// Energy Calculation Constants
export const ENERGY = {
    BATTERY_POWER_LIMIT: 5, // kW
    EV_CHARGER_POWER: 7.4,  // kW
};
