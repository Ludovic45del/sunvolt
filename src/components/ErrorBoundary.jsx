// ErrorBoundary.jsx - Graceful error handling
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('SolarWidget Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
                    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 max-w-md text-center border border-white/10">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-bold mb-2">Something went wrong</h2>
                        <p className="text-slate-400 text-sm mb-4">We're sorry, but something unexpected happened.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-[#fbc73d] text-[#19344d] font-bold rounded-full hover:bg-[#fbc73d]/90 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
