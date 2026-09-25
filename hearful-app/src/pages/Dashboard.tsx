import { useState } from 'react';
import { Power, MoreHorizontal, BatteryFull, Globe, BuildingComplex, Park, BatteryCharging, BatteryWarning, Battery, CircleQuestionMark } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import bgImage from '../assets/bg-dashboard.png';
import glassesImg from '../assets/glasses-dash.png';

export default function Dashboard() {
    const [envMode, setEnvMode] = useState('Urbano');
    const [subSize, setSubSize] = useState(45);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isPowerConfirmOpen, setIsPowerConfirmOpen] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [toggles, setToggles] = useState({
        parlato: false,
        lis: false,
        radar: false,
        registra: false
    });

    const handlePowerClick = () => {
        if (isOffline) {
            setIsOffline(false); // Riaccende
        } else if (isPowerConfirmOpen) {
            setIsOffline(true); // Spegne
            setIsPowerConfirmOpen(false);
        } else {
            setIsPowerConfirmOpen(true); // Mostra avviso
        }
    };

    const toggleSwitch = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col font-sans overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#02184B] to-[#010D27]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="-mt-4 flex items-center justify-between px-6 pt-12 pb-2 text-white">
                <div className="flex items-center relative z-50 transition-all duration-700">
                    {/* Logo Hearful SVG compatto */}
                    <svg width="29" height="31" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" strokeWidth={2}>
                        <g filter="url(#filter0_d_539_444)">
                            <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                        </g>
                    </svg>
                    <span className="text-[20px] font-light tracking-small -ml-1">Hearful</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handlePowerClick}
                        className={`relative z-50 p-2 -mr-2 rounded-full transition-all ${isPowerConfirmOpen ? 'bg-red-500/20 text-red-500' :
                            isOffline ? 'text-red-500 hover:bg-gray-800' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <Power className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button className="relative z-50 p-2 -mr-2 text-gray-300 hover:bg-gray-800 rounded-full transition-colors">
                        <MoreHorizontal className="w-6 h-6" strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Hero Section (Stato + Occhiali + Titolo) */}
            <div className="flex flex-col items-center pt-2 pb-6 text-white relative">
                <div className="flex items-center space-x-1.5 mb-10">
                    <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${isOffline ? 'bg-red-500 text-red-500 animate-pulse' : 'bg-green-500 text-green-500 animate-pulse'}`} />
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isOffline ? 'text-red-400' : 'text-white'}`}>
                        {isOffline ? 'Non connesso' : 'Connesso'}
                    </span>
                </div>

                {/* Occhiali Box */}
                <div className="w-full flex justify-center px-4 -mt-30 -mb-20">
                    <div className="w-full max-w-[500px] aspect-[2/1] flex items-center justify-center text-white/40">
                        <img src={glassesImg} className="w-full max-w-[500px] object-contain" />
                    </div>
                </div>

                <h1 className="text-[32px] font-semibold tracking-tight leading-tight mb-2">XRAI Glass</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                    {isOffline ? <Battery className="w-5 h-5 text-white" /> : <BatteryFull className="w-5 h-5 text-white" />}
                    <span className="font-medium text-[13px]">{isOffline ? <CircleQuestionMark size={16} /> : "100%"}</span>
                </div>
                <span className="text-[11px] font-medium tracking-wide mt-1 text-gray-400 mb-10">{isOffline ? "OFFLINE" : "AAC"}</span>
            </div>

            {/* Main Controls Area */}
            <main className="flex-1 px-5 pb-32 space-y-4 text-white">

                {/* Configurazione Ambientale Card */}
                <div className="bg-[#242424] rounded-[24px] p-5 shadow-lg border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[13px] font-medium text-gray-200">Configurazione ambientale</h2>
                        <span className="text-gray-400 text-lg leading-none">&rsaquo;</span>
                    </div>

                    {/* Slider Steps Visivi */}
                    <div className="relative flex justify-between items-end">
                        {/* Linea dietro gli step */}
                        <div className="absolute top-[22px] left-8 right-8 h-[2px] bg-[#3B3B3B] -z-10" />

                        {/* 1. Casa */}
                        <button onClick={() => setEnvMode('Casa')} className="flex flex-col items-center space-y-2 group hover:opacity-80 transition-opacity">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${envMode === 'Casa' && !isOffline ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent' : 'border border-gray-500 bg-[#242424]'}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={envMode === 'Casa' && !isOffline ? 2 : 1.5} className={`transition-colors duration-500 ${envMode === 'Casa' && !isOffline ? 'text-white' : 'text-[#979797ea]'}`}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <span className={`text-[11px] transition-colors duration-500 ${envMode === 'Casa' && !isOffline ? 'font-medium text-white' : 'text-gray-400'}`}>Casa</span>
                        </button>

                        {/* 2. Aperto */}
                        <button onClick={() => setEnvMode('Aperto')} className="flex flex-col items-center space-y-2 group hover:opacity-80 transition-opacity">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${envMode === 'Aperto' && !isOffline ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent' : 'border border-gray-500 bg-[#242424]'}`}>
                                <Park color={envMode === 'Aperto' && !isOffline ? 'white' : '#979797ea'} strokeWidth={envMode === 'Aperto' && !isOffline ? 2 : 1.5} className="transition-colors duration-500"></Park>
                            </div>
                            <span className={`text-[11px] transition-colors duration-500 ${envMode === 'Aperto' && !isOffline ? 'font-medium text-white' : 'text-gray-400'}`}>Aperto</span>
                        </button>

                        {/* 3. Urbano */}
                        <button onClick={() => setEnvMode('Urbano')} className="flex flex-col items-center space-y-2 group hover:opacity-80 transition-opacity">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${envMode === 'Urbano' && !isOffline ? 'bg-[#0095FF] shadow-[0_4px_12px_rgba(0,149,255,0.4)] border-transparent' : 'border border-gray-500 bg-[#242424]'}`}>
                                <BuildingComplex color={envMode === 'Urbano' && !isOffline ? 'white' : '#979797ea'} strokeWidth={envMode === 'Urbano' && !isOffline ? 2 : 1.5} className="transition-colors duration-500"></BuildingComplex>
                            </div>
                            <span className={`text-[11px] transition-colors duration-500 ${envMode === 'Urbano' && !isOffline ? 'font-medium text-white' : 'text-gray-400'}`}>Urbano</span>
                        </button>
                    </div>
                </div>

                {/* Dimensione Sottotitoli Card */}
                <div className="bg-[#242424] rounded-[24px] p-5 shadow-lg border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[13px] font-medium text-gray-200">Dimensione sottotitoli</h2>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-gray-400"><Globe></Globe></div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-gray-300">A</span>
                        {/* Slider Custom */}
                        <div className="flex-1 relative h-6 flex items-center">
                            <div className="absolute left-0 right-0 h-1.5 bg-[#404040] rounded-full pointer-events-none" />
                            <div className={`absolute left-0 h-1.5 ${isOffline ? 'bg-[#5b5b5b]' : 'bg-[#0095FF]'} rounded-full pointer-events-none`} style={{ width: `${subSize}%` }} />

                            <input
                                type="range"
                                min="0" max="100"
                                value={subSize}
                                onChange={(e) => setSubSize(Number(e.target.value))}
                                onTouchStart={() => setShowOverlay(true)}
                                onTouchEnd={() => setShowOverlay(false)}
                                onMouseDown={() => setShowOverlay(true)}
                                onMouseUp={() => setShowOverlay(false)}
                                className="w-full h-full opacity-0 cursor-pointer appearance-none z-10"
                            />

                            <div className="absolute h-6 w-6 bg-white rounded-full shadow-md pointer-events-none" style={{ left: `calc(${subSize}% - 12px)` }} />
                        </div>
                        <span className="text-2xl font-bold text-gray-200">A</span>
                    </div>
                </div>

                {/* Pulsante Funzionalità AR */}
                <div
                    className={`w-full py-4 rounded-[16px] text-white font-medium text-[15px] text-center tracking-wide transition-all duration-500 ${isOffline ? 'shadow-none text-gray-300' : 'shadow-[0_0_20px_rgba(0,153,255,0.4)]'
                        }`}
                    style={{
                        background: isOffline
                            ? 'radial-gradient(circle at center bottom, rgb(156 163 175) 0%, rgb(75 85 99) 50%)'
                            : 'radial-gradient(circle at center bottom, rgb(216 239 255) 0%, rgb(0 146 255) 30%)'
                    }}
                >
                    Funzionalità AR
                </div>

                {/* Area dei 4 Toggles a griglia */}
                <div className="grid grid-cols-2 gap-3 pb-8">
                    <button onClick={() => toggleSwitch('parlato')} className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm text-left w-full">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Trascrizione<br />Parlato</span>
                        <div className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-500 ${toggles.parlato && !isOffline ? 'bg-[#0095FF] justify-end' : 'bg-[#4B4B4B] justify-start'}`}>
                            <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                    </button>

                    <button onClick={() => toggleSwitch('lis')} className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm text-left w-full">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Trascrizione<br />LIS</span>
                        <div className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-500 ${toggles.lis && !isOffline ? 'bg-[#0095FF] justify-end' : 'bg-[#4B4B4B] justify-start'}`}>
                            <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                    </button>

                    <button onClick={() => toggleSwitch('radar')} className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm text-left w-full">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Radar Suoni<br />Ambientali</span>
                        <div className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-500 ${toggles.radar && !isOffline ? 'bg-[#0095FF] justify-end' : 'bg-[#4B4B4B] justify-start'}`}>
                            <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                    </button>

                    <button onClick={() => toggleSwitch('registra')} className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm text-left w-full">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Registra<br />Trascrizioni</span>
                        <div className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-500 ${toggles.registra && !isOffline ? 'bg-[#0095FF] justify-end' : 'bg-[#4B4B4B] justify-start'}`}>
                            <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                    </button>
                </div>
            </main>

            {/* Navbar fluttuante */}
            <BottomNav isOffline={isOffline} />

            {/* Overlay Dimensione Font in Tempo Reale */}
            <div className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-700 ease-out ${showOverlay ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="flex flex-col items-center">
                    <div className="text-white mb-4 opacity-70 text-sm tracking-wider uppercase font-medium">Anteprima Trascrizioni</div>
                    <div
                        className="text-white font-bold transition-all duration-400 ease-out text-center px-6"
                        style={{ fontSize: `${16 + (subSize / 100) * 48}px`, lineHeight: 1.2 }}
                    >
                        Life, Subtitled.
                    </div>
                </div>
            </div>

            {/* Global Offline Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/20 transition-all duration-700 ease-out ${isOffline ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Spegnimento Overlay (Conferma Accessibilità) */}
            <div
                className={`fixed inset-0 z-40 backdrop-blur-md transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 ${isPowerConfirmOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsPowerConfirmOpen(false)}
            >
                {/* Preveniamo che cliccare sul modal lo chiuda */}
                <div className="bg-[#242424] p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                        <Power className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-3">Spegnimento</h3>
                    <p className="text-gray-300 text-[15px] font-light leading-relaxed mb-8">
                        Attenzione, tutte le funzionalità AR verranno disattivate e il dispositivo si spegnerà.
                    </p>
                    <button
                        onClick={handlePowerClick}
                        className="w-full py-4 rounded-full bg-red-500 text-white font-medium text-lg hover:bg-red-600 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"
                    >
                        Conferma Spegnimento
                    </button>
                </div>
            </div>
        </div>
    );
}
