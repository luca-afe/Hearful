import React from 'react';
import { Power } from 'lucide-react';

interface PowerConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function PowerConfirmModal({ isOpen, onClose, onConfirm }: PowerConfirmModalProps) {
    return (
        <div
            className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-md transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        >
            {/* Modal Box */}
            <div
                className="bg-[#242424] p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl border border-white/5 transform transition-all duration-500 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <Power className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">Spegnimento</h3>
                <p className="text-gray-300 text-[15px] font-light leading-relaxed mb-8">
                    Attenzione, tutte le funzionalità AR verranno disattivate e il dispositivo si spegnerà.
                </p>
                <button
                    onClick={onConfirm}
                    className="w-full py-4 rounded-full bg-red-500 text-white font-medium text-lg hover:bg-red-600 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse cursor-pointer"
                >
                    Conferma Spegnimento
                </button>
            </div>
        </div>
    );
}
