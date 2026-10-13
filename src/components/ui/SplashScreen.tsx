'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

const MOBILE_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Reveal.mp4';
const DESKTOP_VIDEO_URL = 'https://ik.imagekit.io/u52zrbsbci/Gema%20Taruna%20Logo.mp4';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMobileOrPortrait, setIsMobileOrPortrait] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissSplash = useCallback(() => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    setFadingOut((prev) => {
      if (prev) return prev;
      setTimeout(() => {
        setVisible(false);
      }, 450);
      return true;
    });
  }, []);

  // Kunci scrollbar halaman selama loading screen tampil agar tidak ada celah scrollbar di tepi layar
  useEffect(() => {
    if (!visible) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [visible]);

  useEffect(() => {
    const checkViewport = () => {
      const portraitOrMobile =
        window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      setIsMobileOrPortrait(portraitOrMobile);
      setVideoSrc(portraitOrMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL);
    };

    checkViewport();

    // Safety timer panjang (30 detik) hanya jika koneksi terputus total dan onError tidak terpanggil
    safetyTimerRef.current = setTimeout(() => {
      dismissSplash();
    }, 30000);

    return () => {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
    };
  }, [dismissSplash]);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const vid = videoRef.current;
    const bgVid = bgVideoRef.current;

    vid.muted = true;
    vid.playsInline = true;
    if (bgVid) {
      bgVid.muted = true;
      bgVid.playsInline = true;
      bgVid.play().catch(() => {});
    }

    vid.play().catch(() => {
      // Jika browser memblokir autoplay, coba putar ulang sekali lagi
      setTimeout(() => {
        if (vid.paused) {
          vid.play().catch(() => dismissSplash());
        }
      }, 300);
    });
  }, [videoSrc, dismissSplash]);

  const handlePlaying = () => {
    const vid = videoRef.current;
    if (bgVideoRef.current && bgVideoRef.current.paused) {
      bgVideoRef.current.play().catch(() => {});
    }
    if (vid && Number.isFinite(vid.duration) && vid.duration > 0) {
      const remainingMs = Math.max((vid.duration - vid.currentTime) * 1000, 1000);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      // Pastikan timer cadangan baru aktif setelah durasi penuh video selesai (+2.5 detik toleransi buffering)
      safetyTimerRef.current = setTimeout(() => {
        dismissSplash();
      }, remainingMs + 2500);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full z-[9999] bg-[#070d12] flex items-center justify-center overflow-hidden select-none transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {videoSrc && (
        <>
          {/* Lapisan latar full-bleed agar tidak ada celah hitam di kiri/kanan (Web) maupun atas/bawah (Mobile) */}
          <video
            ref={bgVideoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-xl opacity-95 pointer-events-none"
          />

          {/* Video utama: full-screen & tepat di tengah tanpa memotong logo/tulisan */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlaying={handlePlaying}
            onEnded={dismissSplash}
            onError={dismissSplash}
            style={
              isMobileOrPortrait
                ? {
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                  }
                : {
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
                  }
            }
            className={
              isMobileOrPortrait
                ? 'relative z-10 w-full h-full object-cover object-center block'
                : 'relative z-10 w-full h-full object-contain object-center block'
            }
          />
        </>
      )}
    </div>
  );
}
