import React, { useState, useEffect } from 'react';
import './FirecrackersBackground.scss';

const FirecrackersBackground = () => {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework = {
        id: Math.random(),
        x: Math.random() * 100,
        y: 20 + Math.random() * 60,
        color: ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#2979FF', '#00E676', '#FFEA00', '#FF9100'][Math.floor(Math.random() * 8)],
        particles: Array.from({ length: 30 }, (_, i) => ({
          angle: (i * 360) / 30,
        })),
      };
      
      setFireworks(prev => [...prev, newFirework]);
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 2000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="firecrackers-background">
      {/* Starry background */}
      <div className="stars-container">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Center burst */}
          <div
            className="firework-center"
            style={{
              backgroundColor: firework.color,
            }}
          />
          
          {/* Particles */}
          {firework.particles.map((particle, i) => (
            <div
              key={i}
              className="firework-particle"
              style={{
                backgroundColor: firework.color,
                boxShadow: `0 0 10px ${firework.color}`,
                '--angle': `${particle.angle}deg`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FirecrackersBackground;