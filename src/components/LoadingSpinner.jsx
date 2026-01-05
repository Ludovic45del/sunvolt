
import { memo } from 'react';

const LoadingSpinner = memo(() => (
    <div
        className="min-h-screen bg-[#0f172a] flex items-center justify-center"
        role="status"
        aria-label="Loading application"
    >
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#fbc73d] animate-spin" />
            </div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading...</p>
        </div>
    </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
