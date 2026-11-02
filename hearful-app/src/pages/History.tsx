import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, MoreHorizontal, User, Users, ArrowLeft, Play, Pause } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PowerConfirmModal from '../components/PowerConfirmModal';
import { useDevice } from '../context/DeviceContext';
import bgImage from '../assets/bg-dashboard.png';

interface Message {
    id: string;
    sender: string;
    text: string;
    translation?: string;
    time: string;
    color?: string;
    isUser?: boolean;
}

interface ConversationItem {
    id: string;
    name: string;
    snippet: string;
    time: string;
    date: string;
    isGroup?: boolean;
    isHighlighted?: boolean;
    messages: Message[];
}

const mockConversations: ConversationItem[] = [
    {
        id: '1',
        name: 'Monique',
        snippet: 'Luca è proprio bellissimo ma non glielo dire mi raccomando..',
        time: '9:41',
        date: '25/05/26',
        isHighlighted: true,
        messages: [
            {
                id: 'm1',
                sender: 'Luca',
                text: 'Hello, Monique! Come sta andando il test degli occhiali Hearful con i sottotitoli in tempo reale?',
                translation: 'Hello, Monique! How is the Hearful AR glasses test going with real-time subtitles?',
                time: '9:38',
                color: '#0095FF',
                isUser: true,
            },
            {
                id: 'm2',
                sender: 'Monique',
                text: 'Tutto fantastico Luca! La trascrizione bilingue e la traduzione simultanea sono precisissime.',
                translation: 'Everything is great, Luca! Bilingual transcription and simultaneous translation are super precise.',
                time: '9:40',
                color: '#9d00ff',
                isUser: false,
            },
            {
                id: 'm3',
                sender: 'Monique',
                text: 'Luca è proprio bellissimo ma non glielo dire mi raccomando..',
                translation: 'Luca is really good looking, but please don’t tell him..',
                time: '9:41',
                color: '#9d00ff',
                isUser: false,
            },
        ],
    },
    {
        id: '2',
        name: 'Luca',
        snippet: 'Monique è proprio scema ma non glielo dire mi raccomando..',
        time: '18:45',
        date: '12/05/26',
        isHighlighted: false,
        messages: [
            {
                id: 'l1',
                sender: 'Monique',
                text: 'Luca, hai finito di rifinire il prototipo animato e gli sketch su Figma?',
                time: '18:42',
                color: '#9d00ff',
                isUser: false,
            },
            {
                id: 'l2',
                sender: 'Luca',
                text: 'Sì! Sto collegando le ultime viste del radar e dello storico trascrizioni.',
                time: '18:44',
                color: '#0095FF',
                isUser: true,
            },
            {
                id: 'l3',
                sender: 'Luca',
                text: 'Monique è proprio scema ma non glielo dire mi raccomando..',
                time: '18:45',
                color: '#0095FF',
                isUser: true,
            },
        ],
    },
    {
        id: '3',
        name: 'Andrea, Michele',
        snippet: 'Dovremmo organizzare la festa a sorpresa di Cristina prossima settimana...',
        time: '3:45',
        date: '06/05/26',
        isGroup: true,
        isHighlighted: false,
        messages: [
            {
                id: 'a1',
                sender: 'Andrea',
                text: 'Ragazzi ci siete? Dobbiamo decidere per il compleanno di Cristina.',
                time: '3:42',
                color: '#10B981',
                isUser: false,
            },
            {
                id: 'a2',
                sender: 'Michele',
                text: 'Dovremmo organizzare la festa a sorpresa di Cristina prossima settimana...',
                time: '3:45',
                color: '#F59E0B',
                isUser: false,
            },
            {
                id: 'a3',
                sender: 'Tu',
                text: 'Ottima idea! Ci penso io a prenotare la sala.',
                time: '3:46',
                color: '#0095FF',
                isUser: true,
            },
        ],
    },
    {
        id: '4',
        name: 'Francesco',
        snippet: 'In merito al lavoro che ti dicevo...',
        time: '13:32',
        date: '30/04/26',
        isHighlighted: false,
        messages: [
            {
                id: 'f1',
                sender: 'Francesco',
                text: 'Ciao! Hai cinque minuti per aggiornarci sul progetto universitario?',
                time: '13:30',
                color: '#0095FF',
                isUser: false,
            },
            {
                id: 'f2',
                sender: 'Francesco',
                text: 'In merito al lavoro che ti dicevo...',
                time: '13:32',
                color: '#0095FF',
                isUser: false,
            },
            {
                id: 'f3',
                sender: 'Tu',
                text: 'Dimmi pure, ti ascolto tramite la trascrizione vocale.',
                time: '13:33',
                color: '#0095FF',
                isUser: true,
            },
        ],
    },
    {
        id: '5',
        name: 'Speaker1, Speaker2, Speaker3',
        snippet: 'Volete andare al cinema domani?',
        time: '10:41',
        date: '09/03/26',
        isGroup: true,
        isHighlighted: false,
        messages: [
            {
                id: 's1',
                sender: 'Speaker1',
                text: 'Ciao a tutti! Siete liberi nel weekend?',
                time: '10:38',
                color: '#EC4899',
                isUser: false,
            },
            {
                id: 's2',
                sender: 'Speaker2',
                text: 'Io sì, avete proposte interessanti?',
                time: '10:40',
                color: '#8B5CF6',
                isUser: false,
            },
            {
                id: 's3',
                sender: 'Speaker3',
                text: 'Volete andare al cinema domani?',
                time: '10:41',
                color: '#06B6D4',
                isUser: false,
            },
        ],
    },
    {
        id: '6',
        name: 'Alessio',
        snippet: 'Ci vediamo alle 18 davanti al teatro per i biglietti.',
        time: '16:20',
        date: '28/02/26',
        isHighlighted: false,
        messages: [
            {
                id: 'al1',
                sender: 'Alessio',
                text: 'Ho preso i posti in terza fila!',
                time: '16:18',
                color: '#0095FF',
                isUser: false,
            },
            {
                id: 'al2',
                sender: 'Alessio',
                text: 'Ci vediamo alle 18 davanti al teatro per i biglietti.',
                time: '16:20',
                color: '#0095FF',
                isUser: false,
            },
        ],
    },
    {
        id: '7',
        name: 'Chiara',
        snippet: 'Ho caricato il video con la trascrizione dei gesti LIS!',
        time: '11:15',
        date: '14/02/26',
        isHighlighted: false,
        messages: [
            {
                id: 'c1',
                sender: 'Chiara',
                text: 'Ho caricato il video con la trascrizione dei gesti LIS!',
                time: '11:15',
                color: '#0095FF',
                isUser: false,
            },
            {
                id: 'c2',
                sender: 'Tu',
                text: 'Ottimo, verifico subito la sincronizzazione con la maschera delle lenti.',
                time: '11:17',
                color: '#0095FF',
                isUser: true,
            },
        ],
    },
];

export default function History() {
    const navigate = useNavigate();
    const { isOffline, setIsOffline } = useDevice();
    const [selectedChat, setSelectedChat] = useState<ConversationItem | null>(null);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [isPowerConfirmOpen, setIsPowerConfirmOpen] = useState(false);
    const filteredConversations = mockConversations;

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
            navigate('/radar', { state: { fromTab: true } });
        } else if (view === 'history') {
            // Already on history
            setSelectedChat(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="absolute inset-0 min-h-screen bg-cover bg-center flex flex-col font-sans overflow-hidden text-white bg-gradient-to-br from-[#02184B] to-[#010D27]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 pt-12 pb-2 relative z-30 shrink-0">
                <Link to="/dashboard" className="flex items-center transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer">
                    {/* Hearful Logo */}
                    <svg width="29" height="31" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" strokeWidth={2}>
                        <g filter="url(#filter0_d_history)">
                            <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                        </g>
                        <defs>
                            <filter id="filter0_d_history" x="-4" y="-2" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.168627 0 0 0 0 0.305882 0 0 0 0.7 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_history" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_history" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <span className="text-[20px] font-light tracking-small -ml-1 text-white">Hearful</span>
                </Link>

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

            {/* Main Content Card Container */}
            <main className="flex-1 px-5 pt-1 pb-28 max-w-md mx-auto w-full flex flex-col min-h-0">
                <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-[32px] border border-white/5 shadow-2xl flex-1 flex flex-col min-h-0 overflow-hidden relative">
                    {/* Top Header with Wave Background */}
                    <div className="relative pt-6 px-6 pb-2 shrink-0 overflow-hidden">
                        {/* Organic blue wave background in the top-right corner */}
                        <div
                            className="absolute -top-10 -right-10 w-72 h-64 pointer-events-none opacity-90"
                            style={{
                                background:
                                    'radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.85) 0%, rgba(29,78,216,0.65) 45%, rgba(16,37,100,0.2) 75%, transparent 100%)',
                                filter: 'blur(16px)',
                            }}
                        />

                        {/* Top row with Speech Clock Icon and Recording indicator */}
                        <div className="flex items-center justify-between relative z-10 mb-4">
                            {/* Speech bubble with Clock inside */}
                            <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/85">
                                <path
                                    d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 18.7844 4.94827 21.3496 6.54145 23.3857L4.5 28.5L9.98223 26.6806C11.7766 27.5255 13.8298 28 16 28Z"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
                                <path d="M16 13.5V16L18 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {/* Red recording pulse + audio waveform */}
                            <div className="flex items-center space-x-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
                                <div className="flex items-center space-x-0.5 h-3 text-red-500">
                                    <span className="w-0.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                                    <span className="w-0.5 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
                                    <span className="w-0.5 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                                    <span className="w-0.5 h-3.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                    <span className="w-0.5 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="relative z-10 mb-2">
                            <h1 className="text-[28px] font-bold text-white tracking-tight leading-[1.1]">
                                Conversation<br />History
                            </h1>
                        </div>
                    </div>

                    {/* Scrollable Conversation List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2.5 scroll-smooth custom-scrollbar">
                        {filteredConversations.map((chat) => {
                            if (chat.isHighlighted) {
                                return (
                                    /* Featured Highlighted Card (Monique) */
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChat(chat)}
                                        className="bg-gradient-to-r from-[#4A8FE7] via-[#529BF8] to-[#5AA5FC] rounded-[22px] p-3.5 flex items-start space-x-3 cursor-pointer shadow-lg hover:brightness-105 active:scale-[0.98] transition-all border border-white/20 group"
                                    >
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center shrink-0 text-white bg-white/10 shadow-sm">
                                            <User className="w-5 h-5 text-white" strokeWidth={2.2} />
                                        </div>

                                        {/* Text info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-[15px] font-bold text-white tracking-tight truncate">
                                                    {chat.name}
                                                </h3>
                                                <span className="text-[11px] font-light text-white/90 shrink-0 ml-2">
                                                    {chat.time}
                                                </span>
                                            </div>

                                            <p className="text-[12px] text-white/95 font-normal leading-snug line-clamp-2 mt-0.5 pr-1">
                                                {chat.snippet}
                                            </p>

                                            <div className="text-right mt-1">
                                                <span className="text-[10px] text-white/80 font-light">
                                                    {chat.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            /* Standard Dark Cards */
                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className="bg-[#262629] hover:bg-[#2F2F33] rounded-[22px] p-3.5 flex items-start space-x-3 cursor-pointer border border-white/5 transition-all active:scale-[0.98] group"
                                >
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full border border-[#0095FF]/60 flex items-center justify-center shrink-0 text-[#0095FF] bg-[#0095FF]/10">
                                        {chat.isGroup ? (
                                            <Users className="w-5 h-5" strokeWidth={2} />
                                        ) : (
                                            <User className="w-5 h-5" strokeWidth={2} />
                                        )}
                                    </div>

                                    {/* Text info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[15px] font-bold text-[#0095FF] tracking-tight truncate">
                                                {chat.name}
                                            </h3>
                                            <span className="text-[11px] font-light text-gray-400 shrink-0 ml-2">
                                                {chat.time}
                                            </span>
                                        </div>

                                        <p className="text-[12px] text-gray-300 font-light leading-snug line-clamp-2 mt-0.5 pr-1">
                                            {chat.snippet}
                                        </p>

                                        <div className="text-right mt-1">
                                            <span className="text-[10px] text-gray-500 font-light">
                                                {chat.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Carousel / Page Indicator (Matching Prototype) */}
                <div className="flex items-center justify-center space-x-2 mt-3 mb-1 shrink-0">
                    <div className="w-24 h-1.5 rounded-full bg-[#0095FF] shadow-[0_0_10px_rgba(0,149,255,0.7)]" />
                    <div className="w-2 h-1.5 rounded-full bg-[#162136]" />
                </div>
            </main>

            {/* Bottom Navigation */}
            <BottomNav
                isOffline={isOffline}
                activeView="history"
                onNavigate={handleNav}
            />

            {/* ------------- CHAT DETAIL MODAL (Conversation Viewer) ------------- */}
            <AnimatePresence>
                {selectedChat && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed inset-0 z-[120] bg-[#020B1A]/95 backdrop-blur-2xl flex flex-col font-sans text-white"
                    >
                        {/* Detail Top Header */}
                        <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-[#141416] border-b border-white/10 shrink-0 shadow-lg">
                            <button
                                onClick={() => {
                                    setSelectedChat(null);
                                    setIsPlayingAudio(false);
                                }}
                                className="p-2 -ml-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center"
                                aria-label="Chiudi dettaglio"
                            >
                                <ArrowLeft className="w-6 h-6 mr-1" />
                            </button>

                            <div className="flex flex-col items-center">
                                <h2 className="text-[17px] font-bold text-white tracking-tight leading-tight">
                                    {selectedChat.name}
                                </h2>
                                <span className="text-[11px] text-[#0095FF] font-medium mt-0.5">
                                    {selectedChat.date} • {selectedChat.time}
                                </span>
                            </div>

                            <div className="w-8" />
                        </div>

                        {/* Dialogue Stream Container */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            <div className="flex justify-center my-2">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                    Trascrizione Audio Salvata
                                </span>
                            </div>

                            {selectedChat.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'} space-y-1`}
                                >
                                    <div className="flex items-center space-x-2 px-1">
                                        <span
                                            className="text-[11px] font-bold"
                                            style={{ color: msg.color || '#0095FF' }}
                                        >
                                            {msg.sender}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-light">
                                            {msg.time}
                                        </span>
                                    </div>

                                    <div
                                        className={`max-w-[85%] rounded-[20px] p-4 shadow-md ${
                                            msg.isUser
                                                ? 'bg-[#0095FF] text-white rounded-tr-xs'
                                                : 'bg-[#242426] text-gray-100 rounded-tl-xs border border-white/5'
                                        }`}
                                    >
                                        <p className="text-[14px] leading-relaxed font-medium">
                                            {msg.text}
                                        </p>
                                        {msg.translation && (
                                            <div className="mt-2 pt-2 border-t border-white/10 text-[12px] text-white/80 font-light italic">
                                                {msg.translation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Audio Simulation Player Bar */}
                        <div className="p-4 pb-8 bg-[#18181A] border-t border-white/10 shrink-0">
                            <div className="flex items-center space-x-3 bg-[#242426] p-3 rounded-2xl border border-white/5">
                                <button
                                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                    className="w-10 h-10 rounded-full bg-[#0095FF] flex items-center justify-center text-white shrink-0 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                                >
                                    {isPlayingAudio ? (
                                        <Pause className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5 ml-0.5" />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between text-[11px] text-gray-400 font-medium mb-1">
                                        <span>{isPlayingAudio ? '0:14' : '0:00'}</span>
                                        <span>0:45</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-[#0095FF] transition-all duration-300 rounded-full ${
                                                isPlayingAudio ? 'w-1/3' : 'w-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
        </motion.div>
    );
}
