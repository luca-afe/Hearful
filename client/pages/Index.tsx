import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#03060f] text-white">
      <div className="relative flex w-full max-w-md flex-1 flex-col overflow-hidden sm:max-w-lg">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5ed645365c43bb157ede528e0bae9683bf534f9f?width=948"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex w-full flex-1 flex-col px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
        {/* Brand lockup */}
        <div className="flex items-center gap-2">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 shrink-0 drop-shadow-[0_2px_4px_rgba(47,43,78,0.7)] sm:h-11 sm:w-11"
          >
            <path
              d="M30.375 16.8749C30.375 5.62493 14.625 6.74993 14.625 16.8749C14.625 23.6249 23.625 21.3749 23.625 26.9999C23.625 33.7499 16.875 35.9999 16.875 29.2499"
              stroke="#C7D5FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.00003 16.875C6.75003 3.375 24.75 2.25 30.375 4.5C39.375 7.875 39.375 19.125 33.75 25.875C30.375 30.375 28.125 31.5 28.125 34.875C28.125 42.75 11.25 43.875 11.25 36C11.25 33.75 12.375 32.625 13.5 32.625"
              stroke="#0095FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.95 27.45C15.1927 27.45 16.2 26.4426 16.2 25.2C16.2 23.9573 15.1927 22.95 13.95 22.95C12.7074 22.95 11.7 23.9573 11.7 25.2C11.7 26.4426 12.7074 27.45 13.95 27.45Z"
              fill="#E2EAFF"
            />
          </svg>
          <span className="text-2xl font-medium sm:text-4xl">Hearful</span>
        </div>

        {/* AR glasses illustration */}
        <div className="relative mt-8 flex h-44 items-center justify-center sm:h-56">
          <div className="absolute inset-0 rounded-[32px] bg-brand/25 blur-3xl" />
          <svg
            viewBox="0 0 320 130"
            className="relative w-full max-w-[360px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3f47" />
                <stop offset="100%" stopColor="#05070a" />
              </linearGradient>
            </defs>
            <line x1="8" y1="40" x2="34" y2="52" stroke="#8b93a3" strokeWidth="4" strokeLinecap="round" />
            <line x1="286" y1="52" x2="312" y2="40" stroke="#8b93a3" strokeWidth="4" strokeLinecap="round" />
            <rect x="26" y="26" width="112" height="78" rx="20" fill="url(#lens)" stroke="#1c1f24" strokeWidth="2" />
            <rect x="182" y="26" width="112" height="78" rx="20" fill="url(#lens)" stroke="#1c1f24" strokeWidth="2" />
            <rect x="132" y="52" width="56" height="14" rx="7" fill="#05070a" />
            <rect x="30" y="30" width="26" height="12" rx="6" fill="#cfd6e2" opacity="0.55" />
            <rect x="264" y="30" width="26" height="12" rx="6" fill="#cfd6e2" opacity="0.55" />
            <rect x="35" y="18" width="14" height="16" rx="3" fill="#c9ccd2" />
            <rect x="271" y="18" width="14" height="16" rx="3" fill="#c9ccd2" />
          </svg>
        </div>

        {/* Headline */}
        <div className="mt-10 flex flex-1 flex-col gap-4 sm:mt-14">
          <h1 className="text-[40px] font-medium leading-[1.05] sm:text-5xl">
            Life,
            <br />
            Subtitled.
          </h1>
          <p className="max-w-[320px] text-[15px] font-extralight leading-relaxed text-white/90 sm:max-w-sm sm:text-base">
            Ascolta ogni attimo visualizzando trascrizioni in tempo reale di
            ciò che ti circonda, direttamente sui tuoi occhiali AR.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/inizia"
            className="w-full rounded-full border border-black/80 bg-[radial-gradient(85%_28%_at_50%_90%,#D8EFFF_0%,#0095FF_100%)] py-3.5 text-center text-xl font-normal text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:brightness-110 active:scale-[0.99]"
          >
            Inizia
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/lingua"
              className="rounded-full border border-brand-light/70 bg-white/0 py-3 text-center text-[15px] font-light text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
            >
              Lingua
            </Link>
            <Link
              to="/accessibilita"
              className="rounded-full border border-brand-light/70 bg-white/0 py-3 text-center text-[15px] font-light text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
            >
              Accessibilità
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
