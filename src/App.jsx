import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import Cake from './Components/Cake';
import FirecrackersBackground from './Components/FirecrackersBackground';
import './App.scss';
import BirthSong from "../src/assets/happy-birthday-368842.mp3"

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const MemoizedFirecrackers = memo(FirecrackersBackground);

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      // Try to autoplay once loaded
      tryAutoplay();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      
      audio.volume = 0.4;
      audio.loop = true;
    }

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Try to autoplay music
  const tryAutoplay = async () => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked:', error);
        setShowPlayButton(true);
      }
    }
  };

  const startMusic = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Audio play failed:', error);
          setIsPlaying(false);
        }
      }
    }
  };

  const playMusicOnCandleBlow = useCallback(async () => {
    const audio = audioRef.current;

    if (audio && !isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  }, [isPlaying]);

  return (
    <div className="app-container">
      <MemoizedFirecrackers />
      
      <audio 
        ref={audioRef}
        preload="auto"
        src={BirthSong}
        muted={false}
      />
      
      {/* Start Music button (only shows if autoplay is blocked) */}
      {showPlayButton && (
        <button
          onClick={startMusic}
          style={{
            position: "fixed",
            // top: "80px",
            right: "70px",
            zIndex: 1000,
            background: "rgb(170 76 175 / 49%)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
            transition: "all 0.3s ease",
            animation: "pulse 2s infinite"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#45a049";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#4CAF50";
            e.target.style.transform = "scale(1)";
          }}
        >
          🎵 Start Music
        </button>
      )}
      
      {/* Music toggle button */}
      <button 
        onClick={toggleMusic}
        style={{
          position: "fixed",
          // top: "20px",
          right: "20px",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #ddd",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          color: isPlaying ? "#4CAF50" : "#999"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 1)";
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.9)";
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
      
      <div className="content-wrapper">
        <div style={{marginBottom:"115px"}}>
          <h1 className="main-title" style={{padding:"0px",margin:"0px"}}>
            Happy Birthday REEM! 🎂
          </h1>
          <p className="subtitle">
            🎤 Yaa nfe5ilna lchmu3 mnl MICROPHONE 
          </p>
          <p className="subtitle">
            🐛 EZA TAFYET LCHAM3A RJA3I DAWIYA WTAFYEA MN WEN MNL MICROPHONE HAY BUG MA N7ALET MA3I 
          </p>
        </div>
        
        <div>
          <Cake onCandleBlow={playMusicOnCandleBlow} />
        </div>
      </div>
    </div>
  );
}

export default App;