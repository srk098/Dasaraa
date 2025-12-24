"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface VideoContentType {
  heading: string;
  description: string;
  videoUrl: string;
  active: boolean;
}

// Ensure global YT callback exists BEFORE iframe script loads
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

if (typeof window !== "undefined" && !window.onYouTubeIframeAPIReady) {
  window.onYouTubeIframeAPIReady = () => { };
}

export default function VideoSection() {
  const [videoContent, setVideoContent] = useState<VideoContentType | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [isYouTube, setIsYouTube] = useState(false);

  const iframeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ---------------------------
  // Load Firestore Content
  // ---------------------------
  useEffect(() => {
    const fetchVideoContent = async () => {
      const restaurantId = "dasaraa";

      const docRef = doc(
        db,
        "restaurants",
        restaurantId,
        "Home_Page",
        "video-section"
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as VideoContentType;
        if (data.active) {
          setVideoContent(data);
          setIsYouTube(checkIfYouTubeUrl(data.videoUrl));
        }
      }
    };

    fetchVideoContent();
  }, []);

  // ---------------------------
  // Universal YouTube ID Extractor
  // ---------------------------
  const getYouTubeVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);

      // youtu.be/xxxx
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.substring(1);
      }

      // youtube.com/watch?v=xxxx
      if (urlObj.searchParams.get("v")) {
        return urlObj.searchParams.get("v");
      }

      // youtube.com/embed/xxxx
      const pathParts = urlObj.pathname.split("/");
      return pathParts[pathParts.length - 1];
    } catch (error) {
      return null;
    }
  };

  const checkIfYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // ---------------------------
  // Load YouTube Player
  // ---------------------------
  useEffect(() => {
    if (!videoContent || !isYouTube) return;

    const videoId = getYouTubeVideoId(videoContent.videoUrl);
    if (!videoId) return;

    const loadYTPlayer = () => {
      if (!iframeRef.current) return;

      const ytPlayer = new window.YT.Player(iframeRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          modestbranding: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            setPlayer(event.target);
          },
        },
      });
    };

    // If script not loaded yet
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => loadYTPlayer();
    } else {
      loadYTPlayer();
    }
  }, [videoContent, isYouTube]);

  // ---------------------------
  // Mute Toggle
  // ---------------------------
  const toggleMute = () => {
    if (isYouTube) {
      if (player) {
        if (player.isMuted()) {
          player.unMute();
          setIsMuted(false);
        } else {
          player.mute();
          setIsMuted(true);
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    }
  };

  if (!videoContent) return null;

  return (
    <section className="6">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Decorative squiggly line */}
        {/* <div className="text-[#b55227] text-6xl mb-6">
          ~•~•~•~•~•~•~•~•~•~•~•~•~•~
        </div> */}

        <h2 className="font-bold text-secondary mb-4">
          {videoContent.heading}
        </h2>
        {/* Decorative border */}
        <div className="flex justify-center mb-6">
          <img
            src="/Images/heading_main.PNG"
            alt="decor border"
            className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[37%]"

          />
        </div>

        <p className="text-gray-800 mb-6">
          {videoContent.description}
        </p>

        {/* Video Container */}
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">

          {/* YouTube */}
          {isYouTube ? (
            <div
              ref={iframeRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          ) : (
            /* MP4 Video */
            <video
              ref={videoRef}
              src={videoContent.videoUrl}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          )}

          {/* Mute Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-white/70 p-2 rounded-full shadow-md"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-800" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-800" />
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
