import { Glasses, Type, Hand, Radio, Clock, ClosedCaption } from 'lucide-react';

interface BottomNavProps {
    isOffline?: boolean;
    activeView?: 'dashboard' | 'cc' | 'lis';
    onNavigate?: (view: 'dashboard' | 'cc' | 'lis') => void;
}

export default function BottomNav({ isOffline = false, activeView = 'dashboard', onNavigate }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center pb-6 px-4 z-50 pointer-events-none">
            <div className={`bg-[#242424] rounded-[36px] px-6 py-4 flex items-center justify-between pointer-events-auto border border-white/5 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOffline ? 'w-[160px]' : 'w-full max-w-[350px]'}`}>
                {/* 1. Dashboard */}
                <button
                    onClick={() => onNavigate?.('dashboard')}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 origin-left ${isOffline ? 'scale-[1.15]' : 'scale-100'}`}
                >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${activeView === 'dashboard' ? 'bg-[#0095FF] text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}>
                        <Glasses className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </button>

                {/* 2. Sottotitoli */}
                <button
                    onClick={() => onNavigate?.('cc')}
                    className={`group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-50 pointer-events-none' : 'w-11 opacity-100 scale-100'}`}
                >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${activeView === 'cc' ? 'bg-[#0095FF] text-white' : 'bg-transparent text-gray-400 group-hover:text-white'}`}>
                        <ClosedCaption className="w-6 h-6 shrink-0" />
                    </div>
                </button>

                {/* 3. LIS */}
                <button
                    onClick={() => onNavigate?.('lis')}
                    className={`group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-50 pointer-events-none' : 'w-11 opacity-100 scale-100'}`}
                >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${activeView === 'lis' ? 'bg-[#0095FF] text-white' : 'bg-transparent text-gray-400 group-hover:text-white'}`}>
                        <Hand className="w-6 h-6 shrink-0" />
                    </div>
                </button>

                {/* 4. Radar */}
                <button className={`group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-50 pointer-events-none' : 'w-11 opacity-100 scale-100'}`}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 bg-transparent text-gray-400 group-hover:text-white">
                        <Radio className="w-6 h-6 shrink-0" />
                    </div>
                </button>

                {/* 5. Storico */}
                <button className={`text-gray-400 hover:text-white transition-transform duration-700 origin-right flex items-center justify-center shrink-0 ${isOffline ? 'scale-[1.15]' : 'scale-100'}`}>
                    <Clock className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
