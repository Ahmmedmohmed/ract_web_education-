import React, { useRef, useState, useEffect } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    SkipForward,
    SkipBack,
} from "lucide-react";
import { nameMainColor } from "../../../../utils/constants";

const VideoPlayer = ({ videoUrl, title, isProtected = true }) => {
    const videoRef = useRef();
    const videoContainerRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isYouTube, setIsYouTube] = useState(false);
    const [youTubeId, setYouTubeId] = useState(null);
    const [error, setError] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const id = getYouTubeId(videoUrl);
        if (id) {
            setYouTubeId(id);
            setIsYouTube(true);
            return;
        }
        setIsYouTube(false);
    }, [videoUrl]);

    const getYouTubeId = (url) => {
        if (!url) return null;
        try {
            const regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[7].length === 11 ? match[7] : null;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        if (isYouTube) return;

        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (isFinite(video.duration)) {
                setCurrentTime(video.currentTime);
                setDuration(video.duration);
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleError = (e) => {
            console.error("Video error:", e);
            setError("Failed to load video");
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(100);
        };
        const handleVolumeUpdate = () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
        };

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("loadedmetadata", updateProgress);
        video.addEventListener("error", handleError);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("volumechange", handleVolumeUpdate);

        if (isProtected) {
            const preventDefaultActions = (e) => {
                e.preventDefault();
                return false;
            };

            const events = [
                "contextmenu",
                "copy",
                "cut",
                "keydown",
                "keyup",
                "keypress",
            ];

            events.forEach((event) => {
                video.addEventListener(event, preventDefaultActions);
            });

            return () => {
                events.forEach((event) => {
                    video.removeEventListener(event, preventDefaultActions);
                });
                video.removeEventListener("timeupdate", updateProgress);
                video.removeEventListener("loadedmetadata", updateProgress);
                video.removeEventListener("error", handleError);
                video.removeEventListener("play", handlePlay);
                video.removeEventListener("pause", handlePause);
                video.removeEventListener("ended", handleEnded);
                video.removeEventListener("volumechange", handleVolumeUpdate);
            };
        }

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("loadedmetadata", updateProgress);
            video.removeEventListener("error", handleError);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("volumechange", handleVolumeUpdate);
        };
    }, [videoUrl, isPlaying, isYouTube, isProtected]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const togglePlay = () => {
        if (isYouTube) return;

        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play().catch((e) => {
                setError("Playback failed: " + e.message);
            });
        }
    };

    const toggleMute = () => {
        if (isYouTube) return;

        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
    };

    const handleVolumeChange = (e) => {
        if (isYouTube) return;

        const value = parseFloat(e.target.value);
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value;
            videoRef.current.muted = value === 0;
        }
    };

    const handleProgressChange = (e) => {
        if (isYouTube) return;

        const value = parseFloat(e.target.value);
        setProgress(value);
        if (videoRef.current && isFinite(duration)) {
            videoRef.current.currentTime = (value / 100) * duration;
        }
    };

    const formatTime = (time) => {
        if (!isFinite(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const skipForward = () => {
        if (isYouTube) return;

        if (videoRef.current && isFinite(duration)) {
            videoRef.current.currentTime = Math.min(
                videoRef.current.currentTime + 10,
                duration
            );
        }
    };

    const skipBackward = () => {
        if (isYouTube) return;

        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
                videoRef.current.currentTime - 10,
                0
            );
        }
    };

    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainerRef.current.requestFullscreen().catch((e) => {
                console.error("Fullscreen error:", e);
            });
        }
    };

    const handleMouseMove = () => {
        if (isYouTube) return;

        setShowControls(true);
    };

    const handleMouseLeave = () => {
        if (isYouTube) return;

        if (isPlaying) {
            setShowControls(false);
        }
    };

    const renderYouTubePlayer = () => {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${youTubeId}?enablejsapi=1&modestbranding=1&rel=0&showinfo=0&controls=1&origin=${window.location.origin}`}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title || "YouTube Video"}
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
            />
        );
    };

    const renderLocalVideoPlayer = () => {
        return (
            <>
                <video
                    ref={videoRef}
                    className="w-full aspect-video object-contain"
                    playsInline
                    onClick={togglePlay}
                    controlsList="nodownload"
                    disablePictureInPicture={isProtected}
                    crossOrigin="anonymous"
                    preload="metadata"
                >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    {error && <p className="text-white p-4">{error}</p>}
                    <p>Your browser does not support the video tag.</p>
                </video>

                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                    } hover:opacity-100`}
                >
                    <div className="flex items-center mb-2 group/progress">
                        <div className="relative w-full">
                            <div
                                className="w-full h-1 bg-gray-500/50 rounded-full overflow-hidden"
                                dir="ltr"
                            >
                                <div
                                    className={`h-full bg-blue-500 rounded-full `}
                                    style={{ width: `${progress}%` }}
                                    dir="ltr"
                                ></div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleProgressChange}
                                className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer group-hover/progress:h-2"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className={`text-white hover:text-blue-400 transition`}
                                onClick={toggleFullscreen}
                                aria-label={
                                    isFullscreen
                                        ? "خروج من وضع ملء الشاشة"
                                        : "ملء الشاشة"
                                }
                            >
                                <Maximize size={18} />
                            </button>

                            <div className="flex items-center group/volume">
                                <div className="w-0 overflow-hidden group-hover/volume:w-16 transition-all duration-300">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="w-16 h-1 ml-0 mr-2 bg-gray-500 rounded-full appearance-none cursor-pointer"
                                        dir="ltr"
                                    />
                                </div>
                                <button
                                    className={`text-white hover:text-blue-400 transition `}
                                    onClick={toggleMute}
                                    aria-label={
                                        isMuted ? "إعادة الصوت" : "كتم الصوت"
                                    }
                                >
                                    {isMuted ? (
                                        <VolumeX size={18} />
                                    ) : (
                                        <Volume2 size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-white text-xs">
                                <span>{formatTime(duration)}</span>
                                <span>/</span>
                                <span>{formatTime(currentTime)}</span>
                            </div>

                            <button
                                className={`text-white hover:text-blue-400 transition`}
                                onClick={skipForward}
                                aria-label="تقدم 10 ثواني"
                            >
                                <SkipForward size={18} />
                            </button>

                            <button
                                className={`text-white hover:text-blue-400 transition`}
                                onClick={togglePlay}
                                aria-label={isPlaying ? "إيقاف" : "تشغيل"}
                            >
                                {isPlaying ? (
                                    <Pause size={20} />
                                ) : (
                                    <Play size={20} />
                                )}
                            </button>

                            <button
                                className={`text-white hover:text-blue-400 transition`}
                                onClick={skipBackward}
                                aria-label="رجوع 10 ثواني"
                            >
                                <SkipBack size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div
            ref={videoContainerRef}
            className="bg-black rounded-lg overflow-hidden relative group  "
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {isYouTube ? renderYouTubePlayer() : renderLocalVideoPlayer()}
        </div>
    );
};

export default VideoPlayer;
