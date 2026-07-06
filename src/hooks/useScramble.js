import { useState, useRef, useCallback, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FRAME_MS = 18;
const STEPS_PER_CHAR = 2;

export function useScramble(original) {
  const [display, setDisplay] = useState(original);
  const timerRef = useRef(null);

  const play = useCallback(() => {
    clearTimeout(timerRef.current);
    let frame = 0;
    const total = original.length * STEPS_PER_CHAR;

    function tick() {
      setDisplay(
        original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < Math.floor(frame / STEPS_PER_CHAR)) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      frame++;

      if (frame <= total) {
        timerRef.current = setTimeout(tick, FRAME_MS);
      } else {
        setDisplay(original);
      }
    }

    tick();
  }, [original]);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    setDisplay(original);
  }, [original]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { display, play, reset };
}
