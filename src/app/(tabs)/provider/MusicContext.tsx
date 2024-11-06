import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Track } from 'react-native-track-player';

interface MusicContextType {
    actualSong: Track | null;
    setSong: (song: Track) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [actualSong, setSong] = useState<Track | null>(null);

    return (
        <MusicContext.Provider value={{ actualSong, setSong }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error("useMusic doit être utilisé dans un MusicProvider");
    }
    return context;
};
