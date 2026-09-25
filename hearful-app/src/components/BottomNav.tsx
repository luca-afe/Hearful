import { Glasses, Type, Hand, Radio, Clock, ClosedCaption } from 'lucide-react';

interface BottomNavProps {
    isOffline?: boolean;
}

export default function BottomNav({ isOffline = false }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center pb-6 px-4 z-50 pointer-events-none">
            <div className={`bg-[#242424] rounded-[36px] px-6 py-4 flex items-center justify-between pointer-events-auto border border-white/5 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOffline ? 'w-[160px]' : 'w-full max-w-[350px]'}`}>
                {/* 1. Dashboard */}
                <button className={`flex items-center justify-center shrink-0 transition-transform duration-700 origin-left ${isOffline ? 'scale-[1.15]' : 'scale-100'}`}>
                    <div className="w-11 h-11 rounded-full bg-[#0095FF] flex items-center justify-center shadow-lg">
                        <Glasses className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                </button>

                {/* Navbar collapse area */}
                <button className={`text-gray-400 hover:text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-0 pointer-events-none mx-0' : 'w-8 opacity-100 scale-100 mx-1'}`}>
                    <ClosedCaption className="w-6 h-6 shrink-0" />
                </button>
                <button className={`text-gray-400 hover:text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-0 pointer-events-none mx-0' : 'w-8 opacity-100 scale-100 mx-1'}`}>
                    <Hand className="w-6 h-6 shrink-0" />
                </button>
                <button className={`text-gray-400 hover:text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 overflow-hidden ${isOffline ? 'w-0 opacity-0 scale-0 pointer-events-none mx-0' : 'w-8 opacity-100 scale-100 mx-1'}`}>
                    <Radio className="w-6 h-6 shrink-0" />
                </button>

                {/* 5. Storico */}
                <button className={`text-gray-400 hover:text-white transition-transform duration-700 origin-right flex items-center justify-center shrink-0 ${isOffline ? 'scale-[1.15]' : 'scale-100'}`}>
                    <Clock className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
