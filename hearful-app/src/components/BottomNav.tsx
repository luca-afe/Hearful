import { Glasses, Type, Hand, Radio, Clock, ClosedCaption } from 'lucide-react';

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center pb-6 px-4 z-50 pointer-events-none">
            <div className="bg-[#242424] rounded-[36px] px-6 py-4 flex items-center justify-between w-full max-w-[350px] pointer-events-auto border border-white/5 shadow-2xl">
                {/*
          NOTA: Al momento uso icone di sistema (Lucide).
          Come abbiamo fatto con il logo Hearful, potremo sostituirle coi tuoi SVG!
        */}
                <button className="flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#0095FF] flex items-center justify-center">
                        <Glasses className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <ClosedCaption className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Hand className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Radio className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
