import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const fireConfettiExplosion = () => {
  // Center burst
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.5 }
  });

  // Side fireworks for 3 seconds
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export default function ConfettiTrigger({ active }) {
  useEffect(() => {
    if (active) {
      fireConfettiExplosion();
    }
  }, [active]);

  return null;
}
