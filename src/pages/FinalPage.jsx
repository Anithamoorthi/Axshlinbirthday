import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useMusic } from '../components/MusicPlayer';

import photo5 from '../assets/photo5.jpg';
import song2 from '../assets/senthamaraiye.mp3';

export default function FinalPage() {
  const { playSong, pauseSong, toggleMute, isMuted, isPlaying } = useMusic();
  const navigate = useNavigate();
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Stop any previous page music and then play the final page song
    pauseSong();
    playSong(song2, true);

    // Generate random sparkle properties on mount
    const generatedSparkles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 85 + 5}%`,
      top: `${Math.random() * 75 + 10}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 2}s`,
      size: `${Math.random() * 0.8 + 0.8}rem`,
      char: ['✨', '⭐', '★', '✦'][Math.floor(Math.random() * 4)],
    }));
    setSparkles(generatedSparkles);
  }, []);

  const handleReplay = () => {
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="final-page-wrapper">
        {/* Fullscreen Background Image */}
        <div
          className="page-bg-overlay"
          style={{ backgroundImage: `url(${photo5})` }}
        />
        {/* Dark overlay */}
        <div
          className="dark-overlay"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        />

        {/* Floating Sparkles */}
        <div className="sparkle-container">
          {sparkles.map((sp) => (
            <span
              key={sp.id}
              className="sparkle-star"
              style={{
                left: sp.left,
                top: sp.top,
                animationDelay: sp.delay,
                animationDuration: sp.duration,
                fontSize: sp.size,
              }}
            >
              {sp.char}
            </span>
          ))}
        </div>

        {/* Central Animated Content */}
        <div className="final-title-container">
          <h1 className="final-title">You are the best ❤️❤️❤️</h1>
          <p className="final-subtitle">Always and forever, your bestie 💕</p>
        </div>

        {/* Action Button to Replay */}
        <div className="final-actions">
          <button className="btn-nav animate-pulse-glow" onClick={handleReplay}>
            Replay from start 🔁
          </button>
        </div>

        {/* Music toggle button */}
        <button
          className={`music-toggle-btn ${isPlaying && !isMuted ? 'pulsing' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
          aria-label="Toggle music mute state"
        >
          {isMuted ? '🔇' : '🎵'}
        </button>
      </div>
    </PageTransition>
  );
}
