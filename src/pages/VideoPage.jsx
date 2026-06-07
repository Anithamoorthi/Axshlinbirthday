import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useMusic } from '../components/MusicPlayer';

import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';

export default function VideoPage() {
  const [activeVideo, setActiveVideo] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { pauseSong } = useMusic();

  // Stop background music on this page to not conflict with videos
  useEffect(() => {
    pauseSong();
  }, []);

  // Force play when switching videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Auto-play blocked or interrupted for video:', err);
        });
      }
    }
  }, [activeVideo]);

  const handleVideoEnded = () => {
    if (activeVideo === 1) {
      setActiveVideo(2);
      // Auto-unmute second video if they already unmuted the first, or keep same mute state
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <PageTransition>
      <div className="video-page-wrapper">
        <div className="video-header">
          <h2>A little something for you 🎬</h2>
          <span className="video-progress-badge">
            Video {activeVideo} of 2
          </span>
        </div>

        {/* Video Player Box */}
        <div className="video-player-container">
          <video
            ref={videoRef}
            className="video-element"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnded}
            controls
          >
            <source src={activeVideo === 1 ? video1 : video2} type="video/mp4" />
            Your browser does not support HTML video.
          </video>

          {/* Floating Unmute Button Overlay if muted */}
          {isMuted && (
            <div className="video-unmute-overlay">
              <button className="btn-unmute" onClick={toggleMute}>
                🔊 Unmute Video
              </button>
            </div>
          )}
        </div>

        <div className="video-footer-note">
          <p>Made with love, just for you 💕</p>
        </div>

        {/* Both-sides navigation controls */}
        <div className="video-nav-controls">
          <Link to="/letter" className="btn-nav">
            ← Letter
          </Link>
          
          <Link to="/final" className="btn-nav">
            Final Page →
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
