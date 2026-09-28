import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Power, MoreHorizontal, Bluetooth, Battery, PowerOff } from 'lucide-react';
import bgDevices from '../assets/bg-devices.png';
import glassesImg from '../assets/glasses-dash.png';

interface DeviceItem {
    id: string;
    name: string;
    owner: string;
    battery: number;
    status: 'ONLINE' | 'OFFLINE';
    type: 'glasses' | 'watch';
}

const mockDevices: DeviceItem[] = [
    {
        id: '1',
        name: 'XRAI Glass',
        owner: 'di Annalisa',
        battery: 83,
        status: 'ONLINE',
        type: 'glasses',
    },
    {
        id: '2',
        name: 'APPLE Watch',
        owner: 'di Annalisa',
        battery: 83,
        status: 'OFFLINE',
        type: 'watch',
    },
    {
        id: '3',
        name: 'XRAI Glass',
        owner: 'di Margherita',
        battery: 83,
        status: 'ONLINE',
        type: 'glasses',
    },
];

export default function Devices() {
    const navigate = useNavigate();
    const [isBluetoothOn, setIsBluetoothOn] = useState(true);
    const [isPowerConfirmOpen, setIsPowerConfirmOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="absolute inset-0 min-h-screen bg-cover bg-center flex flex-col font-sans overflow-y-auto overflow-x-hidden text-white"
            style={{ backgroundImage: `url(${bgDevices})` }}
        >
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 pt-12 pb-3 relative z-30">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    aria-label="Torna indietro"
                    className="p-2 -ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-95 cursor-pointer"
                >
                    <ArrowLeft className="w-6 h-6" strokeWidth={2.2} />
                </button>

                {/* Hearful Center Logo */}
                <div className="flex items-center justify-center">
                    <svg width="29" height="31" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" strokeWidth={2}>
                        <g filter="url(#filter0_d_devices)">
                            <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                        </g>
                        <defs>
                            <filter id="filter0_d_devices" x="-4" y="-2" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.168627 0 0 0 0 0.305882 0 0 0 0.7 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_devices" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_devices" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <span className="text-[21px] font-light tracking-small -ml-1 text-white">Hearful</span>
                </div>

                {/* Right actions */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsPowerConfirmOpen(true)}
                        aria-label="Spegni"
                        className="p-2 -mr-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    >
                        <Power className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button
                        aria-label="Altre opzioni"
                        className="p-2 -mr-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    >
                        <MoreHorizontal className="w-6 h-6" strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Title Section */}
            <div className="flex flex-col items-center mt-3 mb-6 px-6 text-center">
                <h1 className="text-[32px] font-semibold tracking-tight leading-tight text-white drop-shadow-sm">
                    More Control
                </h1>
                <p className="text-[#C7D5FF]/85 text-[13px] font-light tracking-wide mt-1">
                    I tuoi dispositivi, sempre con te
                </p>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 px-5 flex flex-col justify-start max-w-md mx-auto w-full">
                {/* Dark Devices Card */}
                <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-[28px] p-6 border border-white/5 shadow-2xl">
                    {/* Bluetooth switch row */}
                    <div className="flex items-center space-x-3 pb-3">
                        <Bluetooth
                            className={`w-4 h-4 transition-colors duration-300 ${isBluetoothOn ? 'text-[#0095FF]' : 'text-gray-400'}`}
                            strokeWidth={2.2}
                        />
                        <button
                            onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                            className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 cursor-pointer ${isBluetoothOn ? 'bg-[#0095FF] justify-end' : 'bg-[#3A3A3C] justify-start'
                                }`}
                            aria-label="Toggle Bluetooth"
                        >
                            <motion.div
                                layout
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                            />
                        </button>
                    </div>

                    {/* Devices List */}
                    <div className="flex flex-col">
                        {mockDevices.map((device, index) => {
                            const isOnline = device.status === 'ONLINE' && isBluetoothOn;

                            return (
                                <div
                                    key={device.id}
                                    onClick={() => {
                                        if (isOnline && device.type === 'glasses') {
                                            navigate('/dashboard');
                                        }
                                    }}
                                    className={`py-4 transition-all duration-300 relative group ${index !== mockDevices.length - 1 ? 'border-b border-white/10' : ''
                                        } ${isOnline && device.type === 'glasses' ? 'cursor-pointer hover:bg-white/[0.03] -mx-3 px-3 rounded-2xl' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Left info */}
                                        <div className="flex flex-col justify-between self-stretch pr-2 min-w-[120px]">
                                            <div>
                                                <h3 className="text-[17px] font-bold text-white tracking-tight leading-snug">
                                                    {device.name}
                                                </h3>
                                                <p className="text-[12px] text-gray-400 font-normal leading-tight mt-0.5">
                                                    {device.owner}
                                                </p>
                                            </div>

                                            {/* Battery */}
                                            <div className="flex items-center space-x-2 pt-5">
                                                <div className="relative flex items-center text-white/90">
                                                    <Battery className="w-6 h-4" strokeWidth={1.75} />
                                                    <div
                                                        className="absolute left-[3px] top-[4px] bottom-[4px] bg-white rounded-xs"
                                                        style={{ width: `${(device.battery / 100) * 12}px` }}
                                                    />
                                                </div>
                                                <span className="text-[11px] font-medium text-white/90">
                                                    {device.battery}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Center/Right Device Image Placeholder */}
                                        <div className="flex-1 flex justify-center items-center py-1 px-2">
                                            {device.type === 'glasses' ? (
                                                <div className="relative w-28 h-16 flex items-center justify-center">
                                                    <img
                                                        src={glassesImg}
                                                        alt={device.name}
                                                        className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                /* Apple Watch stylized SVG placeholder */
                                                <div className="relative w-24 h-20 flex items-center justify-center">
                                                    <svg width="68" height="74" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
                                                        {/* Top Strap (Blue ocean texture) */}
                                                        <rect x="30" y="2" width="40" height="22" rx="6" fill="#1C3F75" />
                                                        <line x1="33" y1="8" x2="67" y2="8" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />
                                                        <line x1="33" y1="14" x2="67" y2="14" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />

                                                        {/* Bottom Strap */}
                                                        <rect x="30" y="86" width="40" height="22" rx="6" fill="#1C3F75" />
                                                        <line x1="33" y1="94" x2="67" y2="94" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />
                                                        <line x1="33" y1="100" x2="67" y2="100" stroke="#25529A" strokeWidth="2.5" strokeLinecap="round" />

                                                        {/* Watch Case (Titanium / Silver border) */}
                                                        <rect x="18" y="20" width="64" height="70" rx="18" fill="#B3B9C4" />
                                                        <rect x="20" y="22" width="60" height="66" rx="16" fill="#2E333B" />

                                                        {/* Inner Screen */}
                                                        <rect x="24" y="26" width="52" height="58" rx="12" fill="#0C0D10" />

                                                        {/* Screen Reflection Curve */}
                                                        <path d="M26 36C26 30 32 28 38 28H62C68 28 72 32 72 38C56 46 38 60 26 74V36Z" fill="white" fillOpacity="0.06" />

                                                        {/* Digital Crown on Right */}
                                                        <rect x="82" y="38" width="4" height="15" rx="2" fill="#E2E8F0" />
                                                        {/* Action button */}
                                                        <rect x="82" y="60" width="3" height="12" rx="1.5" fill="#94A3B8" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Status */}
                                        <div className="flex items-center self-end pb-0.5 pl-1">
                                            <span className="text-[12px] text-gray-400 font-light mr-1.5">
                                                Stato:
                                            </span>
                                            <span
                                                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider transition-colors duration-300 ${isOnline
                                                    ? 'bg-white text-black shadow-sm'
                                                    : 'bg-[#2A2A2A] text-gray-400 border border-white/5'
                                                    }`}
                                            >
                                                {isOnline ? 'ONLINE' : 'OFFLINE'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>

            {/* Spegnimento Modal (Matching Dashboard) */}
            <div
                className={`fixed inset-0 z-[100] backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center p-6 ${isPowerConfirmOpen ? 'opacity-100 pointer-events-auto bg-black/60' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsPowerConfirmOpen(false)}
            >
                <div
                    className="bg-[#242424] p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                        <Power className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-3">Disconnessione Dispositivi</h3>
                    <p className="text-gray-300 text-[14px] font-light leading-relaxed mb-8">
                        Vuoi disconnettere tutti i dispositivi Bluetooth e tornare alla schermata iniziale?
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setIsPowerConfirmOpen(false);
                                navigate('/');
                            }}
                            className="w-full py-3.5 rounded-full bg-red-500 text-white font-medium text-base hover:bg-red-600 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        >
                            Disconnetti e Spegni
                        </button>
                        <button
                            onClick={() => setIsPowerConfirmOpen(false)}
                            className="w-full py-3 rounded-full bg-white/10 text-gray-300 font-medium text-sm hover:bg-white/20 active:scale-95 transition-all"
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
