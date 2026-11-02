import React, { createContext, useContext, useState, useEffect } from 'react';

interface DeviceContextType {
    isOffline: boolean;
    setIsOffline: (offline: boolean) => void;
    turnOff: () => void;
    turnOn: () => void;
    togglePower: () => void;
}

const DeviceContext = createContext<DeviceContextType>({
    isOffline: false,
    setIsOffline: () => {},
    turnOff: () => {},
    turnOn: () => {},
    togglePower: () => {},
});

export function DeviceProvider({ children }: { children: React.ReactNode }) {
    const [isOffline, setIsOfflineState] = useState<boolean>(() => {
        try {
            const saved = localStorage.getItem('hearful_isOffline');
            return saved === 'true';
        } catch {
            return false;
        }
    });

    const setIsOffline = (offline: boolean) => {
        setIsOfflineState(offline);
        try {
            localStorage.setItem('hearful_isOffline', String(offline));
        } catch {
            // ignore storage errors
        }
    };

    const turnOff = () => setIsOffline(true);
    const turnOn = () => setIsOffline(false);
    const togglePower = () => setIsOffline(!isOffline);

    return (
        <DeviceContext.Provider value={{ isOffline, setIsOffline, turnOff, turnOn, togglePower }}>
            {children}
        </DeviceContext.Provider>
    );
}

export function useDevice() {
    return useContext(DeviceContext);
}
