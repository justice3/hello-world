import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const LovablePlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [bufferRate, setBufferRate] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [lastClick, setLastClick] = useState(0);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      const interval = setInterval(() => {
        const buffered = videoRef.current?.buffered;
        const currentTime = videoRef.current?.currentTime || 0;
        if (buffered && buffered.length) {
          const end = buffered.end(buffered.length - 1);
          setBufferRate(((end - currentTime) * 10).toFixed(2));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [videoUrl]);

  const toggleControls = () => {
    const now = Date.now();
    if (now - lastClick < 300) {
      videoRef.current?.requestFullscreen();
    } else {
      setShowControls(!showControls);
      setLastClick(now);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        controls={showControls}
        autoPlay
        playsInline
        onClick={toggleControls}
        className="w-full h-full object-contain"
      />
      <div className="absolute top-2 left-2 text-white text-xs bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
        {bufferRate} MB/s
      </div>
    </div>
  );
};

export default LovablePlayer;
