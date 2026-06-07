import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import FloatingHearts from '../components/FloatingHearts';
import { useMusic } from '../components/MusicPlayer';

import photo1 from '../assets/photo1.jpg';
import song1 from '../assets/thangapoove.mp3';

export default function PhotoPage() {
  const { playSong, pauseSong, toggleMute, isMuted, isPlaying } = useMusic();

  useEffect(() => {
    // Stop any previous page music and then play this page's song
    pauseSong();
    playSong(song1, false);

    return () => {
      pauseSong();
    };
  }, []);

  return (
    <PageTransition>
      <div className="photo-page-wrapper">
        {/* Full screen background image */}
        <div
          className="page-bg-overlay"
          style={{ backgroundImage: `url(${photo1})` }}
        />
        {/* Soft dark overlay */}
        <div className="dark-overlay" />

        {/* Floating Hearts */}
        <FloatingHearts />

        {/* Centered Large Decorative Text */}
        <h2 className="celebration-heading">
          Happy Birthday my dear Axyyy ❤️
        </h2>

        {/* Floating Music Note Toggle Button */}
        <button
          className={`music-toggle-btn ${isPlaying && !isMuted ? 'pulsing' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
          aria-label="Toggle music mute state"
        >
          {isMuted ? '🔇' : '🎵'}
        </button>

        {/* Next Page Swipe/Arrow Hint */}
        <Link to="/letter" className="nav-indicator-bottom">
          <span>Read my letter</span>
          <span className="arrow-icon">↓</span>
        </Link>
      </div>
    </PageTransition>
  );
}
