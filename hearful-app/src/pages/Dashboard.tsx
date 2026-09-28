import React, { useState, useEffect, useRef } from 'react';
import { Power, MoreHorizontal, BatteryFull, Globe, BuildingComplex, Park, Play, Square, AudioLines, BatteryCharging, BatteryWarning, Battery, CircleQuestionMark } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import bgImage from '../assets/bg-dashboard.png';
import glassesImg from '../assets/glasses-dash.png';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TypewriterText({ orig, trans, render }: { orig: string, trans: string, render: (o: string, t: string) => React.ReactNode }) {
    const [displayedOrig, setDisplayedOrig] = useState('');
    const [displayedTrans, setDisplayedTrans] = useState('');

    useEffect(() => {
        let i = 0;
        let timeout: any;
        const targetLen = Math.max(orig.length, trans.length);
        const speed = 35;

        const typeChar = () => {
            if (i < targetLen) {
                if (i < orig.length) setDisplayedOrig(orig.substring(0, i + 1));
                if (i < trans.length) setDisplayedTrans(trans.substring(0, i + 1));

                let delay = speed;
                const charOrig = orig[i] || '';
                const charTrans = trans[i] || '';
                if ([',', '.', '!', '?'].includes(charOrig) || [',', '.', '!', '?'].includes(charTrans)) {
                    delay = speed * 15;
                }

                i++;
                // Lieve varianza per naturalità (tipo digitazione asincrona umana/IA)
                timeout = setTimeout(typeChar, delay + (Math.random() * 15));
            }
        };
        typeChar();

        return () => clearTimeout(timeout);
    }, [orig, trans]);

    return render(displayedOrig, displayedTrans);
}

export default function Dashboard() {
    const [envMode, setEnvMode] = useState('Urbano');
    const [subSize, setSubSize] = useState(45);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isPowerConfirmOpen, setIsPowerConfirmOpen] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [activeView, setActiveView] = useState<'dashboard' | 'cc'>('dashboard');

    // Captioning specific states
    const [isListening, setIsListening] = useState(false);
    const [captions, setCaptions] = useState<{ id: string, name: string, orig: string, trans: string, color: string, time?: string }[]>([]);

    const [toggles, setToggles] = useState({
        parlato: false,
        lis: false,
        radar: false,
        registra: false
    });

    // Simulate incoming captions
    useEffect(() => {
        if (!isListening) return;

        const sequence = [
            { id: '1', name: 'Luca', orig: 'Hello, my name’s Luca. I am really happy to meet you!', trans: 'Ciao, il mio nome è Luca. Sono contento di conoscerti!', color: '#0095FF', delay: 3500 },
            { id: '2', name: 'Monique', orig: 'Heureux de vous rencontrer, Luca! Je m’appelle Monique.', trans: 'Felice di conoscerti, Luca! Mi chiamo Monica.', color: '#9d00ff', delay: 9000 },
            { id: '3', name: 'Maurice', orig: 'I’m happy that you guys have met, now i can finally tell you about that job..', trans: 'Sono lieto che vi siate presentati, ora posso parlarvi di quel lavoro..', color: '#ff5100ff', delay: 14000 },
        ];

        const timeouts = sequence.map(msg =>
            setTimeout(() => {
                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setCaptions(prev => [...prev, { ...msg, time: timeStr }]);
            }, msg.delay)
        );

        return () => timeouts.forEach(clearTimeout);
    }, [isListening]);

    const handlePlayStop = () => {
        if (isListening) {
            setIsListening(false);
            setCaptions([]); // Reset upon stop for the prototype
        } else {
            setIsListening(true);
        }
    };

    const handlePowerClick = () => {
        if (isOffline) {
            setIsOffline(false); // Riaccende
        } else if (isPowerConfirmOpen) {
            setIsOffline(true); // Spegne
            setIsPowerConfirmOpen(false);
            setActiveView('dashboard'); // Torna alla dashboard
            setIsListening(false); // Stoppa la trascrizione
        } else {
            setIsPowerConfirmOpen(true); // Mostra avviso
        }
    };

    const toggleSwitch = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ y: '-100%', zIndex: 100 }}
            animate={{ y: 0, zIndex: 100 }}
            exit={{ y: '20%', opacity: 0, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="absolute inset-0 min-h-screen bg-cover bg-center flex flex-col font-sans overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#02184B] to-[#010D27]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="-mt-4 flex items-center justify-between px-6 pt-12 pb-2 text-white relative z-[60]">
                <Link to="/" className="flex items-center relative z-50 transition-all duration-700 hover:opacity-80 active:scale-95 cursor-pointer">
                    {/* Logo Hearful SVG compatto */}
                    <svg width="29" height="31" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" strokeWidth={2}>
                        <g filter="url(#filter0_d_539_444)">
                            <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                        </g>
                    </svg>
                    <span className="text-[20px] font-light tracking-small -ml-1">Hearful</span>
                </Link>
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
            <div className={`flex flex-col items-center pt-2 pb-6 text-white relative z-50 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeView === 'cc' ? 'translate-y-8' : 'translate-y-0'}`}>

                {/* Indicatore Stato Dashboard */}
                <div className={`flex items-center space-x-1.5 mb-10 transition-all duration-300 ${activeView === 'cc' ? 'opacity-0 scale-90 absolute top-2' : 'opacity-100 scale-100 relative'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${isOffline ? 'bg-red-500 text-red-500 animate-pulse' : 'bg-green-500 text-green-500 animate-pulse'}`} />
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isOffline ? 'text-red-400' : 'text-white'}`}>
                        {isOffline ? 'Non connesso' : 'Connesso'}
                    </span>
                </div>

                {/* Indicatore Stato Live Captioning */}
                <div className={`flex flex-col items-center space-y-1 transition-all absolute top-2 ${activeView === 'cc' ? 'opacity-100 scale-100 translate-y-0 duration-[800ms]' : 'opacity-0 scale-90 -translate-y-4 pointer-events-none duration-150'}`}>
                    <div className="flex items-center space-x-2 -mt-3">
                        <AudioLines className={`w-5 h-5 text-red-500 ${isListening ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-bold tracking-small text-white">LIVE CAPTIONING</span>
                    </div>
                    <div className={`px-3 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300 font-medium transition-opacity duration-300 ${isListening ? 'opacity-100' : 'opacity-0'}`}>
                        Ascoltando...
                    </div>
                </div>

                {/* Occhiali Box - Transizione Immagini e Sovrapposizione Z-Index */}
                <div className={`w-full flex justify-center px-4 relative z-20 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeView === 'cc' ? 'mt-0 mb-[-90px]' : '-mt-30 -mb-20'}`}>
                    <div className="w-full max-w-[500px] flex items-center justify-center text-white/40 relative">

                        {/* Immagine 1: Dashboard Originale (Viene zoomata nativamente) */}
                        <img
                            src={glassesImg}
                            style={{
                                transformOrigin: '30% 48%',
                                transform: activeView === 'dashboard' ? 'scale(1) translateY(0) translateX(0)' : 'scale(1.8) translateY(-1.5rem) translateX(2.5rem)'
                            }}
                            className="w-full object-contain drop-shadow-2xl transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />

                        {/* Overlay Lenti Occhiali - Visibile in CC */}
                        <div className={`absolute inset-0 flex justify-between items-center px-[22%] pt-[12%] transition-opacity z-30 ${activeView === 'cc' && isListening ? 'opacity-100 duration-1000' : 'opacity-0 pointer-events-none duration-150'}`}>

                            {/* Secondo Interlocutore/i (Basso a Dx lente sx) */}
                            <div className="w-[40%] h-[55%] flex flex-col justify-end items-end overflow-hidden text-right origin-center transition-all duration-1000" style={{ transform: activeView === 'cc' ? 'translateX(5rem) translateY(-3.5rem)' : 'translateX(0)' }}>
                                {captions.map((cap, i) => cap.name !== 'Luca' && (
                                    <TypewriterText key={'2nd-' + cap.id + i} orig={cap.orig} trans={cap.trans} render={(_o, t) => (
                                        <div className="mb-2 w-full opacity-80" style={{ animation: 'fadeInPlace 0.4s ease-out forwards' }}>
                                            <div className="text-[6px] font-bold mb-[1px]" style={{ color: cap.color }}>{cap.name}</div>
                                            <div className="text-[8px] text-white leading-tight drop-shadow-md">{t}</div>
                                        </div>
                                    )} />
                                ))}
                            </div>

                            {/* Primo interlocutore (Alto a Sx lente sx) */}
                            <div className="w-[40%] h-[55%] flex flex-col justify-end items-start overflow-hidden origin-center transition-all duration-1000" style={{ transform: activeView === 'cc' ? 'translateX(-11.5rem) translateY(-6rem)' : 'translateX(0)' }}>
                                {captions.map((cap, i) => cap.name === 'Luca' && (
                                    <TypewriterText key={'1st-' + cap.id + i} orig={cap.orig} trans={cap.trans} render={(_o, t) => (
                                        <div className="mb-2 text-left w-full opacity-80" style={{ animation: 'fadeInPlace 0.4s ease-out forwards' }}>
                                            <div className="text-[6px] font-bold mb-[1px]" style={{ color: cap.color }}>{cap.name}</div>
                                            <div className="text-[8px] text-white leading-tight drop-shadow-md">{t}</div>
                                        </div>
                                    )} />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                <div className={`transition-all duration-[800ms] flex flex-col items-center ${activeView === 'cc' ? 'opacity-0 scale-90 h-0 overflow-hidden mb-0' : 'opacity-100 scale-100 mb-10'}`}>
                    <h1 className="text-[32px] font-semibold tracking-tight leading-tight mb-2">XRAI Glass</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-200">
                        {isOffline ? <Battery className="w-5 h-5 text-white" /> : <BatteryFull className="w-5 h-5 text-white" />}
                        <span className="font-medium text-[13px]">{isOffline ? <CircleQuestionMark size={16} /> : "100%"}</span>
                    </div>
                    <span className="text-[11px] font-medium tracking-wide mt-1 text-gray-400">{isOffline ? "OFFLINE" : "AAC"}</span>
                </div>
            </div>

            {/* View Contenitore Principale */}
            <main className="flex-1 w-full grid">

                {/* ------------- VISTA 1: DASHBOARD ------------- */}
                <div className={`col-start-1 row-start-1 pt-4 px-5 pb-32 space-y-4 text-white transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeView === 'dashboard' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-[200px] pointer-events-none invisible'}`}>
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
                </div>

                {/* ------------- VISTA 2: LIVE CAPTIONING ------------- */}
                <div className={`col-start-1 row-start-1 px-5 flex flex-col transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeView === 'cc' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[200px] pointer-events-none invisible'}`}>
                    <div className="bg-[#242424] rounded-[24px] p-6 shadow-2xl border border-white/5 h-[420px] pt-14 -mt-10 flex flex-col justify-end overflow-hidden relative z-10 font-sans">

                        {/* Background empty text */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${captions.length > 0 ? 'opacity-0 z-0' : 'opacity-100 text-gray-500 z-20'}`}>
                            {isListening ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="flex space-x-2 items-center justify-center h-4">
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">In Ascolto</span>
                                </div>
                            ) : (
                                <span className="text-sm">Premi play per iniziare</span>
                            )}
                        </div>

                        {/* Chat Bubbles Container */}
                        <div className="w-full flex-1 overflow-y-auto space-y-4 pb-4 flex flex-col justify-end relative z-10 transition-opacity">
                            {captions.map((cap, i) => (
                                <TypewriterText key={'chat-' + cap.id + i} orig={cap.orig} trans={cap.trans} render={(o, t) => (
                                    <div className="flex space-x-3 w-full translate-y-2 opacity-0" style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
                                        <div className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div className="flex-1 flex flex-col bg-transparent">
                                            <div className="flex items-baseline space-x-2 mb-1">
                                                <div className="text-[12px] font-bold" style={{ color: cap.color }}>{cap.name}</div>
                                                {cap.time && <div className="text-[10px] text-gray-500 font-medium">{cap.time}</div>}
                                            </div>
                                            <div className="text-[13px] text-gray-300 leading-snug">{o}</div>
                                            <div className="text-[14px] text-white font-bold leading-snug mt-1">{t}</div>
                                        </div>
                                    </div>
                                )} />
                            ))}
                        </div>
                    </div>

                    {/* Controlli Registrazione */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handlePlayStop}
                            className="relative w-16 h-16 flex items-center justify-center transition-all duration-300 active:scale-95"
                        >
                            {/* Play Icon (Si nasconde con uno spring rotatorio) */}
                            <div className={`absolute transition-all duration-[600ms] flex items-center justify-center ${isListening ? 'opacity-0 scale-80 rotate-90' : 'opacity-100 scale-120 rotate-0'}`}>
                                <Play className="w-12 h-12 ml-2 text-white drop-shadow-lg" fill="none" strokeWidth={1} />
                            </div>

                            {/* Stop Icon (Appare sfoderandosi con spring) */}
                            <div className={`absolute transition-all duration-[600ms] flex items-center justify-center ${isListening ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-120 -rotate-90'}`}>
                                <Square className="w-9 h-9 text-red-500 drop-shadow-lg" fill="none" strokeWidth={1.5} />
                            </div>
                        </button>
                    </div>
                </div>

            </main>

            {/* Navbar fluttuante */}
            <BottomNav
                isOffline={isOffline}
                activeView={activeView}
                onNavigate={(view) => setActiveView(view)}
            />

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
                className={`fixed inset-0 z-[55] bg-black/20 transition-all duration-700 ease-out ${isOffline ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Spegnimento Overlay (Conferma Accessibilità) */}
            <div
                className={`fixed inset-0 z-[100] backdrop-blur-md transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 ${isPowerConfirmOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
        </motion.div>
    );
}
