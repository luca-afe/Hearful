# 🦻 Hearful

> **Progetto universitario per il corso di Interazione Uomo-Macchina (HCI)**  
> *Autonomia, accessibilità e consapevolezza ambientale per la comunità sorda attraverso la Realtà Aumentata.*

---

## 📌 Indice
- [Visione del Progetto](#-visione-del-progetto)
- [Funzionalità Principali](#-funzionalità-principali)
  - [1. Trascrizione Parlato (Live Closed Captions)](#1-trascrizione-parlato-live-closed-captions)
  - [2. Trascrizione e Traduzione LIS](#2-trascrizione-e-traduzione-lis)
  - [3. Radar Suoni Ambientali](#3-radar-suoni-ambientali)
  - [4. Storico Trascrizioni](#4-storico-trascrizioni)
  - [5. Gestione Dispositivo AR](#5-gestione-dispositivo-ar)
- [Tecnologie Utilizzate](#-tecnologie-utilizzate)
- [Guida all'Avvio (Esecuzione su Smartphone)](#-guida-allavvio-esecuzione-su-smartphone)
- [Architettura del Progetto](#-architettura-del-progetto)
- [Autori](#-autori)

---

## 👓 Visione del Progetto

**Hearful** nasce come progetto per l'esame universitario di **Interazione Uomo-Macchina**.  
L'obiettivo primario è supportare e restituire piena autonomia alle persone sorde e ipoudenti nella loro quotidianità, sfruttando il paradigma della **Realtà Aumentata (AR)** applicata a occhiali intelligenti (*smart glasses*).

Grazie a Hearful, l'utente può proiettare nel proprio campo visivo:
- Sottotitoli in tempo reale del parlato circostante;
- Interpretazione e traduzione della **LIS (Lingua dei Segni Italiana)**;
- Feedback visivo e aptico per la localizzazione spaziale dei suoni (allarmi, veicoli, rumori improvvisi).

Il design dell'interfaccia segue rigorosamente i principi di usabilità, carico cognitivo ridotto, contrasto visivo accessibile ed ergonomia mobile-first.

---

## ✨ Funzionalità Principali

### 1. Trascrizione Parlato (Live Closed Captions)
- **Sottotitoli in tempo reale**: trascrizione istantanea delle conversazioni e delle voci vicine direttamente sovrapposte alla visuale AR.
- **Personalizzazione visiva**: regolazione della dimensione dei caratteri e del layout per garantire leggibilità in qualsiasi condizione di luce.
- **Filtri contestuali**: ottimizzazione dell'ascolto per scenari specifici (*Casa*, *Aperto*, *Urbano*).

### 2. Trascrizione e Traduzione LIS
- **Supporto Lingua dei Segni**: integrazione di moduli per la visualizzazione e comprensione della LIS.
- **Simulazione e traduzione**: supporto visuale e avatar/video simulato per facilitare la comunicazione bidirezionale tra persone segnanti e udenti.

### 3. Radar Suoni Ambientali
- **Localizzazione spaziale a 360°**: un radar intuitivo mostra la direzione di provenienza degli eventi sonori (destra, sinistra, fronte, retro).
- **Riconoscimento suoni critici**: classificazione dei suoni rilevanti (clacson, allarmi, mezzi di trasporto, rumori domestici).
- **Feedback combinato**: feedback visivo sul radar abbinato a pattern di vibrazione aptica per avvisi immediati senza distrazione visiva costante.
- **Sensibilità regolabile**: calibrazione della soglia di attivazione del microfono in base al contesto ambientale.

### 4. Storico Trascrizioni
- **Archivio conversazioni**: salvataggio automatico delle sessioni di dialogo, sia individuali che di gruppo.
- **Dettagli e traduzione**: visualizzazione dei messaggi temporizzati, identificazione degli interlocutori e traduzioni di supporto.
- **Consultazione rapida**: interfaccia organizzata per data e ora per rileggere facilmente scambi verbali passati.

### 5. Gestione Dispositivo AR
- **Monitoraggio hardware**: stato della batteria degli occhiali, stato della connessione Bluetooth/Wi-Fi e modalità offline.
- **Controlli rapidi**: modalità standby, spegnimento assistito con popup di conferma e riconnessione immediata.

---

## 🛠 Tecnologie Utilizzate

Il progetto è realizzato con uno stack moderno orientato a prestazioni, reattività e standard web:

- **Linguaggio & Framework**: [React 19](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling & CSS**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animazioni & Micro-interazioni**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografia**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`DeviceContext` per la sincronizzazione dello stato globale del dispositivo)

---

## 📲 Guida all'Avvio (Esecuzione su Smartphone)

Per testare al meglio l'esperienza mobile e simulare l'interazione con l'app companion su smartphone:

### 1. Prerequisiti
- **Node.js** (versione 18 o superiore consigliata)
- **npm** (incluso in Node.js)
- Computer e smartphone connessi alla **stessa rete Wi-Fi**

### 2. Installazione
Clona la repository e posizionati nella cartella dell'applicazione:

```bash
git clone https://github.com/luca-afe/Hearful.git
cd Hearful/hearful-app
npm install
```

### 3. Avvio con esposizione sulla rete locale (`--host`)
Per rendere l'app raggiungibile dal tuo smartphone tramite IP locale, esegui:

```bash
npm run dev -- --host
```

### 4. Connessione da telefono
Nel terminale apparirà un output simile al seguente:

```
  VITE v8.x.x  ready in ... ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.XX:5173/
```

1. Apri il browser dello smartphone (es. Chrome o Safari).
2. Digita l'indirizzo mostrato alla voce **Network** (es. `http://192.168.1.XX:5173/`).
3. *(Opzionale)* Per un'esperienza a schermo intero simile a una vera app nativa AR companion, usa l'opzione del browser **"Aggiungi a schermata Home"**.

---

## 📂 Architettura del Progetto

```text
hearful-app/
├── public/                 # Asset statici, icone e favicon
├── src/
│   ├── assets/             # Immagini UI, simulazioni LIS e mock grafici
│   ├── components/         # Componenti riutilizzabili (BottomNav, Modali, ecc.)
│   ├── context/            # DeviceContext (stato connessione, offline, batteria)
│   ├── pages/
│   │   ├── Home.tsx        # Schermata di avvio e onboarding
│   │   ├── Dashboard.tsx   # Hub principale: sottotitoli live e LIS
│   │   ├── Radar.tsx       # Radar 360° e sensibilità suoni ambientali
│   │   ├── History.tsx     # Cronologia e archivio trascrizioni
│   │   └── Devices.tsx     # Gestione occhiali AR e connessioni
│   ├── App.tsx             # Configurazione route animate con Framer Motion
│   └── main.tsx            # Entry point React
├── package.json
└── vite.config.ts
```

---

## 👥 Autori

Progetto ideato e sviluppato per il corso di **Interazione Uomo-Macchina**:

- **Luca Afeltra** — [@luca-afe](https://github.com/luca-afe)
- **Monica Tiberini** — [@tmmt9101](https://github.com/tmmt9101)

