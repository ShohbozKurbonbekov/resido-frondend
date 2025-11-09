import { motion } from "framer-motion";
import {
  PauseIcon,
  Play,
  PlayIcon,
  VideoOff,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import { createSelector } from "reselect";
import { retrieveChosenProperty } from "./selector";
import { useSelector } from "react-redux";
import { serverAPI } from "@/lib/config";

// ---------------------------- REDUX DATA SETUP ------------------------------
const chosenPropertyRetriever = createSelector(
  retrieveChosenProperty,
  (chosenProperty) => ({ chosenProperty })
);

// -------------------------------- COMPONENT -----------------------
const VideoPlayer: React.FC = () => {
  const { chosenProperty } = useSelector(chosenPropertyRetriever);

  const videoUrlRetriever = useMemo(() => {
    return `${serverAPI}/${chosenProperty.mainProperty[0].videos[0]}`;
  }, [chosenProperty]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const btnClasses =
    "p-2 bg-black bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-all";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = (): void => setIsLoading(false);
    const handlePlay = (): void => setIsPlaying(true);
    const handlePause = (): void => setIsPlaying(false);

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // ------------------------------------------ HANDLERS ------------------------------
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => console.error("Play failed:", e));
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ------------------------------------------------ RENDERS --------------------------------
  return (
    <>
      {chosenProperty.mainProperty[0]?.videos.length ? (
        <div className="relative w-full h-full max-h-[535px] aspect-video group mt-3">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-md"
            muted={isMuted}
            playsInline
            preload="auto"
          >
            <source src={videoUrlRetriever} type="video/mp4" />
          </video>

          {/* // Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
              <motion.button
                onClick={togglePlay}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,1)",
                }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center rounded-full bg-white/80 p-4"
              >
                <Play size={30} className="text-black" fill="text-black" />
              </motion.button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="animate-spin rounded-full h-12 w-12 border-dotted border-t-4 border-b-4 border-white"></div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className={btnClasses}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className={btnClasses}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeXIcon className="h-6 w-6" />
              ) : (
                <Volume2Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className="flex flex-row justify-center items-center gap-2 mt-5">
          <VideoOff className="h-6 w-6 text-slate-400" />
          <span className="text-slate-300 text-xl capitalize ">
            {" "}
            No video Available
          </span>
        </p>
      )}
    </>
  );
};

export default VideoPlayer;
