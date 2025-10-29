import React, { useEffect, useState } from 'react';
import './Candle.scss';


const Candle = ({ isLit, onBlowOut }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let mediaRecorder = null;
    let audioContext = null;
    let analyser= null;
    let dataArray = null;
    let animationFrame;

    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsListening(true);

        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const checkBlowing = () => {
          if (!analyser || !dataArray || !isLit) {
            return;
          }

          analyser.getByteFrequencyData(dataArray);
          
          // Calculate average volume
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          
          // If volume exceeds threshold, blow out candle
          if (average > 60) { // Adjust threshold as needed
            onBlowOut();
            return;
          }

          animationFrame = requestAnimationFrame(checkBlowing);
        };

        checkBlowing();
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setIsListening(false);
      }
    };

    if (isLit) {
      startListening();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (audioContext) {
        audioContext.close();
      }
      setIsListening(false);
    };
  }, [isLit]);

  return (
    <div className="candle-container">
      {/* Microphone status indicator */}

      {/* Candle body */}
      <div className="candle-body">
        {/* Candle texture lines */}
        <div className="candle-texture"></div>
      </div>

      {/* Wick */}
      <div className="wick"></div>

      {/* Flame */}
      {isLit && (
        <div className="flame-container">
          <div className="flame-wrapper">
            {/* Main flame */}
            <div className="main-flame"></div>
            
            {/* Inner flame glow */}
            <div className="inner-flame"></div>
          </div>
        </div>
      )}

      {/* Extinguishing animation */}
      {!isLit && (
        <div className="extinguishing-flame">
          <div className="extinguish-animation"></div>
        </div>
      )}
    </div>
  );
};

export default Candle;