import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './VideoHero.css';

interface VideoHeroProps {
  videoSrc?: string | null;
  posterImage?: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ 
  videoSrc = null, 
  posterImage = '/images/university-poster.jpg', 
  title = 'Welcome to Our University',
  subtitle = 'Celebrating 75 Years of Excellence',
  autoPlay = true,
  showControls = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const togglePlay = (): void => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = (): void => {
    if (autoPlay && videoRef) {
      videoRef.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`video-hero ${className}`}>
      <div className="video-hero-container">
        {videoSrc ? (
          <video
            ref={setVideoRef}
            className="video-hero-video"
            poster={posterImage}
            onLoadedData={handleVideoLoad}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted
            loop
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="video-hero-poster"
            style={{
              backgroundImage: `url(${posterImage})`
            }}
          />
        )}
        
        <div className="video-hero-overlay">
          <div className="video-hero-content">
            <h1 className="video-hero-title">{title}</h1>
            <p className="video-hero-subtitle">{subtitle}</p>
            
            {videoSrc && showControls && (
              <button 
                onClick={togglePlay}
                className="video-hero-play-button"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={30} /> : <Play size={30} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
