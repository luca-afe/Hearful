import { Power, MoreHorizontal, BatteryFull, Globe, BuildingComplex, Park } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import bgImage from '../assets/bg-dashboard.png';
import glassesImg from '../assets/glasses-dash.png';

export default function Dashboard() {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col font-sans overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#02184B] to-[#010D27]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 pt-12 pb-2 text-white">
                <div className="flex items-center">
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
                    <Power className="w-5 h-5 text-gray-300" strokeWidth={2} />
                    <MoreHorizontal className="w-6 h-6 text-gray-300" strokeWidth={2} />
                </div>
            </header>

            {/* Hero Section (Stato + Occhiali + Titolo) */}
            <div className="flex flex-col items-center pt-2 pb-6 text-white relative">
                <div className="flex items-center space-x-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Connesso</span>
                </div>

                {/* Occhiali Box */}
                <div className="w-full flex justify-center px-4 -mt-30 -mb-20">
                    <div className="w-full max-w-[500px] aspect-[2/1] flex items-center justify-center text-white/40">
                        <img src={glassesImg} className="w-full max-w-[500px] object-contain" />
                    </div>
                </div>

                <h1 className="text-[32px] font-semibold tracking-tight leading-tight mb-2">XRAI Glass</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                    <BatteryFull className="w-5 h-5 text-white" />
                    <span className="font-medium text-[13px]">100%</span>
                </div>
                <span className="text-[11px] font-medium tracking-wide mt-1 text-gray-400 mb-10">AAC</span>
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
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-11 h-11 rounded-full border border-gray-500 bg-[#242424] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <span className="text-[11px] text-gray-400">Casa</span>
                        </div>

                        {/* 2. Aperto */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-11 h-11 rounded-full border border-gray-500 bg-[#242424] flex items-center justify-center">
                                <Park color='#979797ea' strokeWidth={1.5}></Park>
                            </div>
                            <span className="text-[11px] text-gray-400">Aperto</span>
                        </div>

                        {/* 3. Urbano (Attivo) */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-11 h-11 rounded-full bg-[#0095FF] flex items-center justify-center shadow-[0_4px_12px_rgba(0,149,255,0.4)]">
                                <BuildingComplex strokeWidth={2}></BuildingComplex>
                            </div>
                            <span className="text-[11px] font-medium text-white">Urbano</span>
                        </div>
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
                        {/* Slider Custom (Ricalca il design) */}
                        <div className="flex-1 relative h-1.5 bg-[#404040] rounded-full flex items-center">
                            <div className="absolute left-0 h-full bg-[#0095FF] rounded-full w-[45%]" />
                            <div className="absolute left-[45%] w-6 h-6 bg-white rounded-full shadow-md -translate-x-3" />
                        </div>
                        <span className="text-2xl font-bold text-gray-200">A</span>
                    </div>
                </div>

                {/* Pulsante Funzionalità AR */}
                <button
                    className="w-full py-4 rounded-[16px] text-white font-medium text-[15px] shadow-[0_0_20px_rgba(0,153,255,0.4)] hover:brightness-110 active:scale-95 transition-all"
                    style={{
                        background: 'radial-gradient(circle at center bottom, rgb(216 239 255) 0%, rgb(0 146 255) 30%)'
                    }}
                >
                    Funzionalità AR
                </button>

                {/* Area dei 4 Toggles a griglia */}
                <div className="grid grid-cols-2 gap-3 pb-8">
                    <div className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Trascrizione<br />Parlato</span>
                        {/* Toggle Inattivo */}
                        <div className="w-9 h-5 bg-[#4B4B4B] rounded-full p-0.5 flex">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>

                    <div className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Trascrizione<br />LIS</span>
                        {/* Toggle Inattivo */}
                        <div className="w-9 h-5 bg-[#4B4B4B] rounded-full p-0.5 flex">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>

                    <div className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Radar Suoni<br />Ambientali</span>
                        {/* Toggle Inattivo */}
                        <div className="w-9 h-5 bg-[#4B4B4B] rounded-full p-0.5 flex">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>

                    <div className="bg-[#2A2A2A] rounded-[16px] p-3 flex items-center justify-between border border-white/5 shadow-sm">
                        <span className="text-[11px] leading-tight font-medium text-gray-300">Registra<br />Trascrizioni</span>
                        {/* Toggle Inattivo */}
                        <div className="w-9 h-5 bg-[#4B4B4B] rounded-full p-0.5 flex">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Renderizzo la Navbar fluttuante */}
            <BottomNav />
        </div>
    );
}
