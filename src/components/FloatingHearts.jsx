import React from 'react';

export default function FloatingHearts() {
  // Define 8 hearts with staggered properties
  const hearts = [
    { id: 1, left: '10%', delay: '0s', size: '20px', duration: '8s' },
    { id: 2, left: '25%', delay: '2s', size: '35px', duration: '11s' },
    { id: 3, left: '45%', delay: '0.5s', size: '25px', duration: '9s' },
    { id: 4, left: '60%', delay: '4s', size: '40px', duration: '12s' },
    { id: 5, left: '75%', delay: '1.5s', size: '18px', duration: '7s' },
    { id: 6, left: '90%', delay: '3s', size: '30px', duration: '10s' },
    { id: 7, left: '35%', delay: '5s', size: '28px', duration: '9.5s' },
    { id: 8, left: '80%', delay: '6s', size: '22px', duration: '8.5s' },
  ];

  return (
    <div style={containerStyle}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            ...heartItemStyle,
            left: h.left,
            animationDelay: h.delay,
            fontSize: h.size,
            animationDuration: h.duration,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0, // sit behind the text content but above background image overlay
};

const heartItemStyle = {
  position: 'absolute',
  bottom: '-50px',
  color: 'rgba(255, 117, 143, 0.75)',
  textShadow: '0 0 10px rgba(255, 117, 143, 0.4)',
  userSelect: 'none',
  animationName: 'floatUp',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
};
