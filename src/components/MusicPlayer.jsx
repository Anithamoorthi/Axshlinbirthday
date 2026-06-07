import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(null); // stores { src, loop } if blocked
  
  const audioRef = useRef(null);

  // Initialize Audio object once on mount
  useEffect(() => {
    audioRef.current = new Audio();
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Sync mute state to Audio object
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const playSong = (src, loop = false) => {
    if (!audioRef.current) return;

    // If it's already playing this exact source, just make sure it's playing
    const cleanSrc = new URL(src, window.location.href).href;
    const currentAudioSrc = audioRef.current.src ? new URL(audioRef.current.src, window.location.href).href : '';

    if (currentAudioSrc === cleanSrc) {
      audioRef.current.loop = loop;
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          if (err.name === 'NotAllowedError') {
            setAutoplayBlocked(true);
            setPendingPlay({ src, loop });
          }
        });
      }
      return;
    }

    // Play a new source
    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.loop = loop;
    audioRef.current.load();

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAutoplayBlocked(false);
          setPendingPlay(null);
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            console.warn('Autoplay blocked by browser policy. Displaying unlock overlay.');
            setAutoplayBlocked(true);
            setPendingPlay({ src, loop });
          }
        });
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleUnlockAutoplay = () => {
    if (audioRef.current) {
      // Force play
      audioRef.current.play()
        .then(() => {
          setAutoplayBlocked(false);
          setPendingPlay(null);
        })
        .catch((err) => {
          console.error('Failed to unlock audio playback:', err);
        });
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isMuted,
        isPlaying,
        autoplayBlocked,
        playSong,
        pauseSong,
        toggleMute,
      }}
    >
      {children}

      {/* Autoplay Unlock Overlay */}
      {autoplayBlocked && (
        <div className="tap-overlay" onClick={handleUnlockAutoplay}>
          <div className="tap-overlay-content">
            <span className="tap-overlay-icon">🎵</span>
            <h3>Tap to Play Music</h3>
            <p>Click anywhere to play the background song 💕</p>
          </div>
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
