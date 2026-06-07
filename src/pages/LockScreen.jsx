import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fireConfettiExplosion } from '../components/Confetti';
import { useMusic } from '../components/MusicPlayer';

export default function LockScreen() {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { pauseSong } = useMusic();

  const CORRECT_PIN = '08062006';
  const PIN_LENGTH = 8;

  // On mount, stop any playing music (in case of replay from start)
  useEffect(() => {
    pauseSong();
  }, []);

  const handleKeyPress = (val) => {
    if (isSuccess || isError) return;

    if (val === '⌫') {
      setPin((prev) => prev.slice(0, -1));
    } else if (val === '*') {
      setPin(''); // Reset on *
    } else {
      if (pin.length < PIN_LENGTH) {
        const newPin = pin + val;
        setPin(newPin);

        // Auto-check when reaching 8 digits
        if (newPin.length === PIN_LENGTH) {
          if (newPin === CORRECT_PIN) {
            triggerSuccess();
          } else {
            triggerError();
          }
        }
      }
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    fireConfettiExplosion();
    
    // Navigate after 3 seconds
    setTimeout(() => {
      navigate('/photo');
    }, 3000);
  };

  const triggerError = () => {
    setIsError(true);
    // Shake and flash red for 1 second, then clear
    setTimeout(() => {
      setPin('');
      setIsError(false);
    }, 1000);
  };

  // Keyboard support for desktop testing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSuccess || isError) return;
      
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (e.key === 'Escape' || e.key === '*') {
        handleKeyPress('*');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess, isError]);

  return (
    <PageTransition>
      <div className="lock-screen-wrapper">
        <div className="lock-screen-header">
          <h1>🎂 A surprise is waiting for you...</h1>
          <p>Enter your birthday to unlock</p>
        </div>

        <div className={`lock-card glass-panel ${isError ? 'animate-shake' : ''}`}>
          {/* Dots Indicator */}
          <div className="dots-container">
            {Array.from({ length: PIN_LENGTH }).map((_, index) => {
              const isFilled = index < pin.length;
              let dotClass = 'pin-dot';
              if (isError) {
                dotClass += ' error';
              } else if (isSuccess) {
                dotClass += ' filled';
              } else if (isFilled) {
                dotClass += ' filled';
              }

              return <div key={index} className={dotClass} />;
            })}
          </div>

          {/* Keypad Grid */}
          <div className="keypad-grid">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                className="keypad-btn"
                onClick={() => handleKeyPress(digit)}
              >
                {digit}
              </button>
            ))}
            
            <button
              className="keypad-btn action-btn"
              onClick={() => handleKeyPress('*')}
            >
              Clear
            </button>
            <button
              className="keypad-btn"
              onClick={() => handleKeyPress('0')}
            >
              0
            </button>
            <button
              className="keypad-btn action-btn"
              onClick={() => handleKeyPress('⌫')}
            >
              ⌫
            </button>
          </div>
        </div>

        {/* Subtle Branding or Footer spacing */}
        <div style={{ height: '30px' }} />

        {/* Full screen celebration overlay on correct entry */}
        {isSuccess && (
          <div className="success-overlay animate-fade-in-up">
            <span className="exploding-cake animate-cake">🎂</span>
            <h2 className="success-title">🎉 Happy Birthday Axyyy! 🎉</h2>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
