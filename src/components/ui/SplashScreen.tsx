'use client';

import React, { useEffect, useRef, useState } from 'react';

const MOBILE_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Reveal.mp4';
const DESKTOP_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Logo.mp4';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const dismissSplash = () => {
    setFadingOut((prev) => {
      if (prev) return prev;
      setTimeout(() => {
        setVisible(false);
      }, 450);
      return true;
    });
  };

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobileView(mobile);
    setVideoSrc(mobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL);

    // Fallback safety timer jika jaringan lambat atau browser menahan autoplay
    const fallbackTimer = setTimeout(() => {
      dismissSplash();
    }, 7500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const vid = videoRef.current;
    vid.muted = true;
    vid.playsInline = true;
    vid.play().catch(() => {
      // Jika autoplay diblokir oleh mode hemat daya perangkat, tutup splash setelah jeda singkat
      setTimeout(dismissSplash, 1200);
    });
  }, [videoSrc]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={dismissSplash}
          onError={dismissSplash}
          className={
            isMobileView
              ? 'w-full h-full object-contain bg-black'
              : 'w-full h-full max-w-4xl max-h-[85vh] object-contain bg-black'
          }
        />
      )}
    </div>
  );
}
