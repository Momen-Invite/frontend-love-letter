"use client";

import { useCallback, useEffect, useState } from "react";

// Shared audio singleton state
let globalAudio: HTMLAudioElement | null = null;
let globalSrc: string | null = null;
let wasPlayingBeforeHidden = false;
let wasPlayingBeforeVideo = false;

export function useAudio(audioSrc?: string) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioSrc) return;
    if (typeof window === "undefined") return;

    if (!globalAudio || globalSrc !== audioSrc) {
      if (globalAudio) {
        globalAudio.pause();
      }
      globalAudio = new Audio(audioSrc);
      globalAudio.volume = 0.5;
      globalAudio.loop = true;
      globalSrc = audioSrc;
    }

    const audio = globalAudio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // 1. Auto-pause saat tab ditinggalkan / minimize / keluar web
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (!audio.paused) {
          wasPlayingBeforeHidden = true;
          audio.pause();
        }
      } else if (document.visibilityState === "visible") {
        if (wasPlayingBeforeHidden) {
          audio.play().catch(() => {});
          wasPlayingBeforeHidden = false;
        }
      }
    };

    const handlePageHide = () => {
      if (!audio.paused) {
        audio.pause();
      }
    };

    // 2. Custom event saat video galeri diputar
    const handleVideoPlay = () => {
      if (!audio.paused) {
        wasPlayingBeforeVideo = true;
        audio.pause();
      }
    };

    const handleVideoStop = () => {
      if (wasPlayingBeforeVideo) {
        audio.play().catch(() => {});
        wasPlayingBeforeVideo = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    window.addEventListener("momeninvite:pause-bg-music", handleVideoPlay);
    window.addEventListener("momeninvite:resume-bg-music", handleVideoStop);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      window.removeEventListener("momeninvite:pause-bg-music", handleVideoPlay);
      window.removeEventListener("momeninvite:resume-bg-music", handleVideoStop);
    };
  }, [audioSrc]);

  const play = useCallback(() => {
    if (!audioSrc) return;
    if (!globalAudio || globalSrc !== audioSrc) {
      if (globalAudio) globalAudio.pause();
      globalAudio = new Audio(audioSrc);
      globalAudio.volume = 0.5;
      globalAudio.loop = true;
      globalSrc = audioSrc;
    }
    globalAudio.play().catch((err) => {
      console.warn("Audio playback notice:", err);
    });
  }, [audioSrc]);

  const pause = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.currentTime = 0;
    }
  }, []);

  const toggle = useCallback(() => {
    if (!globalAudio) {
      play();
      return;
    }
    if (globalAudio.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  return { play, pause, stop, toggle, isPlaying };
}

// Helper dispatcher functions untuk komponen video
export function pauseBackgroundMusic() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("momeninvite:pause-bg-music"));
  }
}

export function resumeBackgroundMusic() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("momeninvite:resume-bg-music"));
  }
}
