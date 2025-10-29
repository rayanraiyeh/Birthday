import React, { useState } from 'react';
import './Cake.scss';
import Candle from './Candle';

const Cake = () => {
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowOut = () => {
    if (isLit) {
      setIsLit(false);
      setShowSmoke(true);
      // Hide smoke after animation
      setTimeout(() => setShowSmoke(false), 2000);
    }
  };

  const handleRelight = () => {
    setIsLit(true);
    setShowSmoke(false);
  };

  return (
    <div className="cake-container">
      {/* Cake Base */}
      <div className="cake-base">

      <div className="top-layer">
          <div className="top-decoration"></div>
          {/* Strawberry decorations */}
          <div className="strawberry-1"></div>
          <div className="strawberry-2"></div>
        </div>

      <div className="mid-layer">
          <div className="mid-decoration"></div>
          {/* Strawberry decorations */}
          <div className="strawberry-1"></div>
          <div className="strawberry-2"></div>
        </div>
        {/* Bottom Layer */}
        <div className="bottom-layer">
          {/* Cake decorations */}
          <div className="bottom-decoration"></div>
          {/* Cherry decorations */}
          <div className="cherry-1"></div>
          <div className="cherry-2"></div>
          <div className="cherry-3"></div>
        </div>

      

        {/* Candle positioned on top */}
        <div className="candle-position">
          <Candle isLit={isLit} onBlowOut={handleBlowOut} />
        </div>

   
      </div>

      {/* Plate */}
      <div className="plate"></div>

      {/* Relight button */}
      <button
          onClick={handleRelight}
          style={{visibility:isLit&&"hidden"}}
          className={"relight-button"}
        >
          Light the Candle Again ✨
        </button>
    </div>
  );
};

export default Cake;