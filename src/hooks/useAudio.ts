"use client";

import { useCallback, useRef } from "react";

export function useAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.volume = 0.5;
    }
    
    // Reset and play from beginning
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }, [audioSrc]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      play();
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return { play, stop, toggle };
}
