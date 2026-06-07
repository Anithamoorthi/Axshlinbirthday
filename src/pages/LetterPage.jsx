import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useMusic } from '../components/MusicPlayer';

import photo2 from '../assets/photo2.jpeg';
import song1 from '../assets/thangapoove.mp3';

export default function LetterPage() {
  const [isPaused, setIsPaused] = useState(false);
  const { playSong, pauseSong, toggleMute, isMuted, isPlaying } = useMusic();

  useEffect(() => {
    pauseSong();
    playSong(song1, false);

    return () => {
      pauseSong();
    };
  }, []);

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <PageTransition>
      <div className="letter-page-wrapper">
        {/* Background photo */}
        <div
          className="page-bg-overlay"
          style={{ backgroundImage: `url(${photo2})` }}
        />
        {/* Dark overlay for readability */}
        <div className="dark-overlay" />

        {/* Marquee letter container */}
        <div
          className="marquee-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="marquee-content marquee-scrolling"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            <p>Dear Axyyy,</p>
            
            <p>
              Happy Birthday to the most amazing person in my life! ❤️<br />
              You are one of the best parts of my life, and I am so grateful to have you by my side. Thank you for being my best friend, my biggest supporter, and the person who always understands me, no matter what.
            </p>
            
            <p>
              The memories we've created together are some of my most precious treasures. Your laughter brightens my darkest days, your kindness inspires me, and your friendship means more to me than words can ever express.
            </p>
            
            <p>
              I love you so much and I am truly lucky to have a friend like you. No matter where life takes us, I promise that our friendship will always remain special. I hope this year brings you endless happiness, success, good health, and all the love you deserve.
            </p>
            
            <p>
              Keep smiling, keep shining, and keep being the wonderful person that you are.
            </p>
            
            <p>
              Once again, Happy Birthday, Axyyy! 🎂🎉💕 You will always have a special place in my heart.
            </p>
            
            <p>
              With lots of love,<br />
              Your Bestie ❤️
            </p>
          </div>
        </div>

        {/* Music note toggle button */}
        <button
          className={`music-toggle-btn ${isPlaying && !isMuted ? 'pulsing' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
          aria-label="Toggle music mute state"
        >
          {isMuted ? '🔇' : '🎵'}
        </button>

        {/* Bottom-right next page button */}
        <div className="letter-page-arrow">
          <Link to="/video" className="btn-nav" title="Next to video surprises">
            Next Page →
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
