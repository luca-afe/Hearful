import bgImage from '../assets/bg-home.png';
import occhialiVideo from '../assets/ARglasses1.mp4';
export default function Home() {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col text-white font-sans overflow-hidden bg-gradient-to-tr from-[#020B1A] via-[#103487] to-[#4EB0DB]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Top Bar */}
            <header className="flex items-center px-6 pt-12 pb-4">
                <svg width="41" height="39" viewBox="0 5 43 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <g filter="url(#filter0_d_539_444)">
                        <path d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499" stroke="#C7D5FF" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625" stroke="#0095FF" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z" fill="#E2EAFF" />
                    </g>
                    <defs>
                        <filter id="filter0_d_539_444" x="-4" y="-2" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.168627 0 0 0 0 0.305882 0 0 0 0.7 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_539_444" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_539_444" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <span className="text-3xl font-light tracking-small">Hearful</span>
            </header>

            {/* Main area */}
            <main className="flex-1 flex flex-col justify-end px-6 pb-12">

                {/* Glassess Container */}
                <div className="flex-1 flex items-center justify-center w-full mt-2">
                    <video
                        src={occhialiVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-[110%] max-w-md md:max-w-lg object-contain opacity-90"
                        style={{
                            /*nasconde i bordi duri sfumandoli verso l'esterno */
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)',
                            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)'
                        }}
                    />
                </div>

                {/* Testo descrittivo */}
                <div className="mb-10 w-full mt-4">
                    <h1 className="text-5xl leading-tight mb-4 tracking-tight">
                        Life,<br />
                        Subtitled.
                    </h1>
                    <p className="text-gray-300 text-sm max-w-[280px] font-light">
                        Ascolta ogni attimo visualizzando trascrizioni in tempo reale di ciò che ti circonda, direttamente sui tuoi occhiali AR.
                    </p>
                </div>

                {/* Pulsanti */}
                <div className="space-y-4 w-full">
                    <button
                        className="w-full py-2 rounded-full text-white font-medium text-lg leading-none hover:brightness-110 active:scale-95 transition-all"
                        style={{
                            background: 'radial-gradient(circle at center bottom, rgb(216 239 255) 0%, rgb(0 146 255) 40%)',
                            fontFamily: 'Inter',
                            fontSize: '24px',
                            fontWeight: '300',
                            borderRadius: '20px',
                            height: '50px',
                        }}
                    >
                        Inizia
                    </button>

                    <div className="flex space-x-4">
                        <button className="flex-1 py-2.5 rounded-full border border-gray-400/50 text-white text-sm font-medium hover:bg-white/10 active:bg-white/20 transition-all"
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '15px',
                                fontWeight: '300',
                                borderRadius: '20px',
                                height: '50px',
                            }}
                        >
                            Lingua
                        </button>
                        <button className="flex-1 py-2.5 rounded-full border border-gray-400/50 text-white text-sm font-medium hover:bg-white/10 active:bg-white/20 transition-all"
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '15px',
                                fontWeight: '300',
                                borderRadius: '20px',
                                height: '50px',
                            }}
                        >
                            Accessibilità
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
