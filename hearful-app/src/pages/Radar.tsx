import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Power, MoreHorizontal, Car, Info, ChevronRight, BuildingComplex, Park, Home } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PowerConfirmModal from '../components/PowerConfirmModal';
import { useDevice } from '../context/DeviceContext';
import bgImage from '../assets/bg-dashboard.png';

export default function Radar() {
    const navigate = useNavigate();
    const { isOffline, setIsOffline } = useDevice();
    const [envMode, setEnvMode] = useState<'Casa' | 'Aperto' | 'Urbano'>('Urbano');
    const [sensitivity, setSensitivity] = useState(7); // 1-16
    const [soundDirection, setSoundDirection] = useState<'right' | 'left' | 'top' | 'bottom'>('right');
    const [isPowerConfirmOpen, setIsPowerConfirmOpen] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState<string | null>(null);
    const [hapticPattern, setHapticPattern] = useState(4); // central dot selected

    const totalBars = 16;

    const handlePowerClick = () => {
        if (isOffline) {
            setIsOffline(false);
        } else {
            setIsPowerConfirmOpen(true);
        }
    };

    const handleConfirmShutdown = () => {
        setIsPowerConfirmOpen(false);
        navigate('/dashboard', { state: { triggerShutdownAnimation: true } });
    };

    const handleNav = (view: 'dashboard' | 'cc' | 'lis' | 'radar' | 'history') => {
        if (view === 'dashboard') {
            navigate('/dashboard', { state: { fromTab: true } });
        } else if (view === 'cc' || view === 'lis') {
            navigate('/dashboard', { state: { view, fromTab: true } });
        } else if (view === 'radar') {
            // Already on radar
        } else if (view === 'history') {
            navigate('/history', { state: { fromTab: true } });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="absolute inset-0 min-h-screen bg-cover bg-center flex flex-col font-sans overflow-y-auto overflow-x-hidden text-white bg-gradient-to-br from-[#02184B] to-[#010D27]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 pt-12 pb-1 relative z-30">
                <Link to="/dashboard" className="flex items-center transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer">
                    {/* Logo Hearful */}
                    <svg width="29" height="31" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" strokeWidth={2}>
                        <g filter="url(#filter0_d_radar)">
                            <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                        </g>
                        <defs>
                            <filter id="filter0_d_radar" x="-4" y="-2" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.168627 0 0 0 0 0.305882 0 0 0 0.7 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_radar" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_radar" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <span className="text-[20px] font-light tracking-small -ml-1 text-white">Hearful</span>
                </Link>

                {/* Right controls */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handlePowerClick}
                        aria-label="Spegni"
                        className={`p-2 -mr-2 rounded-full transition-all cursor-pointer ${
                            isPowerConfirmOpen
                                ? 'bg-red-500/20 text-red-500'
                                : isOffline
                                ? 'text-red-500 hover:bg-gray-800'
                                : 'text-gray-300 hover:bg-gray-800'
                        }`}
                    >
                        <Power className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button
                        aria-label="Opzioni"
                        className="p-2 -mr-2 text-gray-300 hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
                    >
                        <MoreHorizontal className="w-6 h-6" strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Sub-header badge: AMBIENT SOUND RADAR */}
            <div className="flex items-center justify-center space-x-2 mt-1 mb-2">
                <Car className="w-4 h-4 text-white" strokeWidth={2.2} />
                <span className="text-[11px] font-semibold tracking-wider text-white uppercase">
                    AMBIENT SOUND RADAR
                </span>
            </div>

            {/* Main scrollable body */}
            <main className="flex-1 px-5 pb-36 space-y-4 max-w-md mx-auto w-full">
                {/* ------------- RADAR CIRCULAR WIDGET ------------- */}
                <div className="flex justify-center my-1 relative">
                    <div className="w-[270px] h-[270px] rounded-full bg-[#1F1F21] relative flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.65)] border border-white/5 overflow-hidden">
                        {/* Interactive Radar SVG */}
                        <svg viewBox="0 0 270 270" className="w-full h-full absolute inset-0">
                            {/* Blue Glowing Arc on the Right Rim (matching detected sound on the right) */}
                            {soundDirection === 'right' && (
                                <path
                                    d="M 264 88 A 131 131 0 0 1 264 182"
                                    fill="none"
                                    stroke="#0095FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(0,149,255,0.9)]"
                                />
                            )}
                            {soundDirection === 'left' && (
                                <path
                                    d="M 6 88 A 131 131 0 0 0 6 182"
                                    fill="none"
                                    stroke="#0095FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(0,149,255,0.9)]"
                                />
                            )}
                            {soundDirection === 'top' && (
                                <path
                                    d="M 88 6 A 131 131 0 0 1 182 6"
                                    fill="none"
                                    stroke="#0095FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(0,149,255,0.9)]"
                                />
                            )}
                            {soundDirection === 'bottom' && (
                                <path
                                    d="M 88 264 A 131 131 0 0 0 182 264"
                                    fill="none"
                                    stroke="#0095FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(0,149,255,0.9)]"
                                />
                            )}

                            {/* TOP Sound Waves */}
                            <g
                                onClick={() => setSoundDirection('top')}
                                className="cursor-pointer transition-opacity hover:opacity-100"
                                stroke={soundDirection === 'top' ? '#FFFFFF' : '#333336'}
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                fill="none"
                            >
                                <path d="M 116 75 Q 135 87 154 75" />
                                <path d="M 108 61 Q 135 77 162 61" />
                                <path d="M 100 47 Q 135 67 170 47" />
                            </g>

                            {/* BOTTOM Sound Waves */}
                            <g
                                onClick={() => setSoundDirection('bottom')}
                                className="cursor-pointer transition-opacity hover:opacity-100"
                                stroke={soundDirection === 'bottom' ? '#FFFFFF' : '#333336'}
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                fill="none"
                            >
                                <path d="M 116 195 Q 135 183 154 195" />
                                <path d="M 108 209 Q 135 193 162 209" />
                                <path d="M 100 223 Q 135 203 170 223" />
                            </g>

                            {/* LEFT Sound Waves */}
                            <g
                                onClick={() => setSoundDirection('left')}
                                className="cursor-pointer transition-opacity hover:opacity-100"
                                stroke={soundDirection === 'left' ? '#FFFFFF' : '#333336'}
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                fill="none"
                            >
                                <path d="M 75 116 Q 87 135 75 154" />
                                <path d="M 61 108 Q 77 135 61 162" />
                                <path d="M 47 100 Q 67 135 47 170" />
                            </g>

                            {/* RIGHT Sound Waves (ACTIVE in Figma Screenshot) */}
                            <g
                                onClick={() => setSoundDirection('right')}
                                className="cursor-pointer"
                                stroke={soundDirection === 'right' ? '#FFFFFF' : '#333336'}
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                fill="none"
                            >
                                <path
                                    d="M 195 116 Q 183 135 195 154"
                                    className={soundDirection === 'right' ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' : ''}
                                />
                                <path
                                    d="M 209 108 Q 193 135 209 162"
                                    className={soundDirection === 'right' ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' : ''}
                                />
                                <path
                                    d="M 223 100 Q 203 135 223 170"
                                    className={soundDirection === 'right' ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' : ''}
                                />
                            </g>

                            {/* Center Human Silhouette Icon */}
                            <g fill="white">
                                {/* Head */}
                                <circle cx="135" cy="103" r="6" />
                                {/* Torso and Legs */}
                                <path d="M129 113 C127.5 113 126 114.5 126 116 L126 135 C126 136.5 127 137.5 128.5 137.5 L129.5 137.5 L129.5 165 C129.5 166.8 131 168 132.5 168 C134 168 135 166.8 135 165 L135 142 L135 142 L135 165 C135 166.8 136 168 137.5 168 C139 168 140.5 166.8 140.5 165 L140.5 137.5 L141.5 137.5 C143 137.5 144 136.5 144 135 L144 116 C144 114.5 142.5 113 141 113 Z" />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* ------------- CARD 1: SENSIBILITÀ RADAR ------------- */}
                <div className="bg-[#242424] rounded-[24px] p-5 shadow-lg border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[13px] font-medium text-gray-200">Sensibilità radar</h2>
                        <button
                            onClick={() =>
                                setShowInfoModal(
                                    'La sensibilità del radar regola la soglia di decibel per rilevare suoni importanti nell’ambiente circostante (es. veicoli, clacson, allarmi).'
                                )
                            }
                            aria-label="Informazioni sensibilità"
                            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Sensitivity Bar Indicator */}
                    <div className="flex items-center justify-between px-1 py-1">
                        {Array.from({ length: totalBars }).map((_, index) => {
                            const isActive = index < sensitivity;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setSensitivity(index + 1)}
                                    aria-label={`Livello ${index + 1}`}
                                    className="cursor-pointer py-1 px-0.5 group focus:outline-none"
                                >
                                    <div
                                        className={`w-[4.5px] h-[34px] rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.45)] group-hover:scale-y-110'
                                                : 'bg-[#3A3A3D] group-hover:bg-[#4E4E52]'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ------------- CARD 2: CONFIGURAZIONE AMBIENTALE ------------- */}
                <div className="bg-[#242424] rounded-[24px] p-5 shadow-lg border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[13px] font-medium text-gray-200">Configurazione ambientale</h2>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Step buttons connected by line */}
                    <div className="relative flex justify-between items-end">
                        <div className="absolute top-[22px] left-8 right-8 h-[2px] bg-[#3B3B3B] -z-10" />

                        {/* 1. Casa */}
                        <button
                            onClick={() => setEnvMode('Casa')}
                            className="flex flex-col items-center space-y-2 group cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    envMode === 'Casa' && !isOffline
                                        ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent'
                                        : 'border border-gray-500 bg-[#242424]'
                                }`}
                            >
                                <Home
                                    className={`w-5 h-5 transition-colors duration-500 ${
                                        envMode === 'Casa' && !isOffline ? 'text-white' : 'text-[#979797ea]'
                                    }`}
                                    strokeWidth={envMode === 'Casa' && !isOffline ? 2 : 1.5}
                                />
                            </div>
                            <span
                                className={`text-[11px] transition-colors duration-500 ${
                                    envMode === 'Casa' && !isOffline ? 'font-medium text-white' : 'text-gray-400'
                                }`}
                            >
                                Casa
                            </span>
                        </button>

                        {/* 2. Aperto */}
                        <button
                            onClick={() => setEnvMode('Aperto')}
                            className="flex flex-col items-center space-y-2 group cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    envMode === 'Aperto' && !isOffline
                                        ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent'
                                        : 'border border-gray-500 bg-[#242424]'
                                }`}
                            >
                                <Park
                                    className={`w-5 h-5 transition-colors duration-500 ${
                                        envMode === 'Aperto' && !isOffline ? 'text-white' : 'text-[#979797ea]'
                                    }`}
                                    strokeWidth={envMode === 'Aperto' && !isOffline ? 2 : 1.5}
                                />
                            </div>
                            <span
                                className={`text-[11px] transition-colors duration-500 ${
                                    envMode === 'Aperto' && !isOffline ? 'font-medium text-white' : 'text-gray-400'
                                }`}
                            >
                                Aperto
                            </span>
                        </button>

                        {/* 3. Urbano (Active in Screenshot) */}
                        <button
                            onClick={() => setEnvMode('Urbano')}
                            className="flex flex-col items-center space-y-2 group cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    envMode === 'Urbano' && !isOffline
                                        ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent'
                                        : 'border border-gray-500 bg-[#242424]'
                                }`}
                            >
                                <BuildingComplex
                                    className={`w-5 h-5 transition-colors duration-500 ${
                                        envMode === 'Urbano' && !isOffline ? 'text-white' : 'text-[#979797ea]'
                                    }`}
                                    strokeWidth={envMode === 'Urbano' && !isOffline ? 2 : 1.5}
                                />
                            </div>
                            <span
                                className={`text-[11px] transition-colors duration-500 ${
                                    envMode === 'Urbano' && !isOffline ? 'font-medium text-white' : 'text-gray-400'
                                }`}
                            >
                                Urbano
                            </span>
                        </button>
                    </div>
                </div>

                {/* ------------- CARD 3: FEEDBACK APTICO ------------- */}
                <div className="bg-[#242424] rounded-[24px] p-5 shadow-lg border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[12px] font-medium text-gray-200 leading-snug">
                            Feedback aptico - Connessione Smartwatch richiesta
                        </h2>
                        <button
                            onClick={() =>
                                setShowInfoModal(
                                    'Collega uno smartwatch per ricevere vibrazioni direzionali aptiche sul polso in corrispondenza della direzione del suono rilevato dal radar.'
                                )
                            }
                            aria-label="Informazioni feedback aptico"
                            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <Info className="w-4 h-4 shrink-0 ml-2" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        {/* Left column: Smartwatch placeholder and status */}
                        <div className="flex flex-col items-center pl-2">
                            {/* Stylized Apple Watch Vector Graphic */}
                            <div className="relative w-20 h-20 flex items-center justify-center opacity-85">
                                <svg width="68" height="74" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                    {/* Straps */}
                                    <rect x="30" y="2" width="40" height="22" rx="6" fill="#1C3F75" />
                                    <line x1="33" y1="8" x2="67" y2="8" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="33" y1="14" x2="67" y2="14" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />

                                    <rect x="30" y="86" width="40" height="22" rx="6" fill="#1C3F75" />
                                    <line x1="33" y1="94" x2="67" y2="94" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="33" y1="100" x2="67" y2="100" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />

                                    {/* Case */}
                                    <rect x="18" y="20" width="64" height="70" rx="18" fill="#5A606B" />
                                    <rect x="20" y="22" width="60" height="66" rx="16" fill="#1E222A" />

                                    {/* Screen */}
                                    <rect x="24" y="26" width="52" height="58" rx="12" fill="#0C0D10" />

                                    {/* Reflection */}
                                    <path d="M26 36C26 30 32 28 38 28H62C68 28 72 32 72 38C56 46 38 60 26 74V36Z" fill="white" fillOpacity="0.05" />

                                    {/* Crown */}
                                    <rect x="82" y="38" width="4" height="15" rx="2" fill="#8892A0" />
                                </svg>
                            </div>

                            {/* Status label: NON CONNESSO */}
                            <div className="flex items-center space-x-1.5 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                                <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                                    NON CONNESSO
                                </span>
                            </div>
                        </div>

                        {/* Right column: Haptic Vibration Matrix Card */}
                        <div className="bg-[#1C1C1E] border border-white/5 rounded-[20px] p-3.5 flex flex-col items-center min-w-[145px] shadow-inner">
                            <span className="text-[10px] text-gray-400 mb-3 font-medium tracking-wide">
                                Intensità vibrazione
                            </span>

                            {/* 3x3 Dot Grid representing haptic motors */}
                            <div className="grid grid-cols-3 gap-3.5 p-1">
                                {Array.from({ length: 9 }).map((_, index) => {
                                    const isSelected = hapticPattern === index;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setHapticPattern(index)}
                                            aria-label={`Punto vibrazione ${index + 1}`}
                                            className="w-2.5 h-2.5 flex items-center justify-center cursor-pointer group focus:outline-none"
                                        >
                                            <div
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                    isSelected
                                                        ? 'bg-[#0095FF] scale-125 shadow-[0_0_8px_rgba(0,149,255,0.9)]'
                                                        : 'bg-gray-500/50 group-hover:bg-gray-400'
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <BottomNav
                isOffline={isOffline}
                activeView="radar"
                onNavigate={handleNav}
            />

            {/* Global Offline Overlay */}
            <div
                className={`fixed inset-0 z-[55] bg-black/20 transition-all duration-700 ease-out ${
                    isOffline ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* Spegnimento Modal */}
            <PowerConfirmModal
                isOpen={isPowerConfirmOpen}
                onClose={() => setIsPowerConfirmOpen(false)}
                onConfirm={handleConfirmShutdown}
            />

            {/* Info Dialog Modal */}
            {showInfoModal && (
                <div
                    className="fixed inset-0 z-[110] backdrop-blur-sm bg-black/60 flex items-center justify-center p-6"
                    onClick={() => setShowInfoModal(null)}
                >
                    <div
                        className="bg-[#242424] p-6 rounded-[24px] max-w-xs w-full text-center border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0095FF]/20 flex items-center justify-center mx-auto mb-3 text-[#0095FF]">
                            <Info className="w-5 h-5" />
                        </div>
                        <p className="text-gray-200 text-sm font-light leading-relaxed mb-5">
                            {showInfoModal}
                        </p>
                        <button
                            onClick={() => setShowInfoModal(null)}
                            className="w-full py-2.5 rounded-full bg-[#0095FF] text-white text-sm font-medium hover:brightness-110 active:scale-95 transition-all"
                        >
                            Ho capito
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
