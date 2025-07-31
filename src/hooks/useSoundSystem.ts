
import { useCallback, useRef } from 'react';
import { useStore } from '@/store/useStore';

type SoundType = 'click' | 'reveal' | 'success' | 'error' | 'ambient' | 'transition';

export const useSoundSystem = () => {
  const { preferences } = useStore();
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const generateTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!preferences.soundEnabled) return;

    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [preferences.soundEnabled, initAudioContext]);

  const playSound = useCallback((type: SoundType) => {
    if (!preferences.soundEnabled) return;

    switch (type) {
      case 'click':
        generateTone(800, 0.1, 'square');
        break;
      case 'reveal':
        // Ascending chord for revelation
        setTimeout(() => generateTone(440, 0.3), 0);
        setTimeout(() => generateTone(550, 0.3), 100);
        setTimeout(() => generateTone(660, 0.3), 200);
        break;
      case 'success':
        generateTone(880, 0.2, 'triangle');
        setTimeout(() => generateTone(1100, 0.2, 'triangle'), 150);
        break;
      case 'error':
        generateTone(300, 0.3, 'sawtooth');
        break;
      case 'transition':
        generateTone(600, 0.15, 'sine');
        setTimeout(() => generateTone(700, 0.15, 'sine'), 75);
        break;
      case 'ambient':
        // Soft ambient tone
        generateTone(220, 2, 'triangle');
        break;
    }
  }, [preferences.soundEnabled, generateTone]);

  const playHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator && preferences.soundEnabled) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, [preferences.soundEnabled]);

  return { playSound, playHaptic };
};
