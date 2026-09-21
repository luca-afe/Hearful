import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#03060f] px-6 text-center text-white">
      <h1 className="text-3xl font-medium">{title}</h1>
      <p className="max-w-sm text-[15px] font-light text-white/70">
        {description ??
          "Questa sezione è in arrivo. Continua a chattare con Fusion per generarne il contenuto."}
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full border border-brand-light/70 px-6 py-2 text-sm font-light text-white transition hover:bg-white/10"
      >
        Torna alla home
      </Link>
    </div>
  );
}
