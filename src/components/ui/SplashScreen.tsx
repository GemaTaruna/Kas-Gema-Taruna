'use client';

import React, { useEffect, useRef, useState } from 'react';

const MOBILE_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Reveal.mp4';
const DESKTOP_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Logo.mp4';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
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
    const updateVideoByViewport = () => {
      const isPortraitOrMobile =
        window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      setVideoSrc(isPortraitOrMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL);
    };

    updateVideoByViewport();

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
      setTimeout(dismissSplash, 1200);
    });
  }, [videoSrc]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-dvh max-w-[100vw] max-h-[100dvh] z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
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
          className="w-full h-full max-w-[100vw] max-h-[100dvh] object-contain bg-black block"
        />
      )}
    </div>
  );
}
