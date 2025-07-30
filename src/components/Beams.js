import { useRef, useEffect } from 'react';
import './Beams.css';

const Beams = ({ beamWidth = 2, beamHeight = 15, beamNumber = 12, lightColor = "#ffffff", speed = 2, noiseIntensity = 1.75, scale = 0.2, rotation = 0 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const beamsData = useRef([]);
  const timeRef = useRef(0);

  const initBeams = () => {
    beamsData.current = Array.from({ length: beamNumber }, (_, i) => ({
      x: (i - beamNumber / 2) * (beamWidth * 20),
      y: 0,
      height: beamHeight * 20,
      width: beamWidth * 10,
      opacity: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      beamSpeed: speed * (0.8 + Math.random() * 0.4),
      offset: Math.random() * 100,
    }));
  };

  const noise = (x, y, t) => {
    return Math.sin(x * 0.01 + t * 0.5) * Math.cos(y * 0.01 + t * 0.3) * noiseIntensity;
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    timeRef.current += 0.016 * speed;

    beamsData.current.forEach((beam) => {
      const noiseX = noise(beam.x, timeRef.current * 100, timeRef.current) * 5;
      const noiseY = noise(beam.y, timeRef.current * 100, timeRef.current + beam.phase) * 3;
      const x = width / 2 + beam.x + noiseX;
      const y = height / 2 + beam.y + noiseY;
      const animatedOpacity = beam.opacity * (0.7 + 0.3 * Math.sin(timeRef.current * beam.beamSpeed + beam.phase));
      
      const gradient = ctx.createLinearGradient(x, y - beam.height / 2, x, y + beam.height / 2);
      const hex = lightColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${animatedOpacity})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - beam.width / 2, y - beam.height / 2, beam.width, beam.height);
      
      beam.y += Math.sin(timeRef.current * beam.beamSpeed + beam.offset) * 0.5;
      if (Math.abs(beam.y) > height) {
        beam.y = -height / 2;
      }
    });
  };

  const animate = () => {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initBeams();
    resize();
    animate();
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [beamNumber, beamWidth, beamHeight, speed, noiseIntensity]);

  return (
    <div className="beams-container" style={{ transform: `rotate(${rotation}deg) scale(${scale + 1})` }}>
      <canvas ref={canvasRef} className="beams-canvas" />
    </div>
  );
};

export default Beams;