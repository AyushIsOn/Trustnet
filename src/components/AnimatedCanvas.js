import React, { useEffect, useRef } from 'react';

const AnimatedCanvas = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const createParticle = () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3, // Reduced velocity for stability
      vy: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 100 + 50,
      maxLife: 150,
      size: Math.random() * 1.2 + 0.4, // Reduced particle size
      color: `rgba(248, 221, 147, ${Math.random() * 0.2 + 0.05})` // Reduced opacity
    });

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000); // Reduced particle count
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
      particlesRef.current = particles;
    };

    const updateParticles = () => {
      if (!isVisibleRef.current) return; // Only update when visible
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Reset particle when life ends
        if (particle.life <= 0) {
          particles[index] = createParticle();
        }
      });
    };

    const drawParticles = () => {
      if (!isVisibleRef.current) return; // Only draw when visible
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      particles.forEach(particle => {
        const alpha = (particle.life / particle.maxLife) * 0.15; // Reduced base alpha
        ctx.fillStyle = `rgba(248, 221, 147, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connecting lines with reduced frequency
      particles.forEach((particle, i) => {
        if (i % 2 === 0) { // Only check every other particle for performance
          particles.slice(i + 2).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 60) { // Reduced connection distance
              const alpha = (60 - distance) / 60 * 0.05; // Much more subtle lines
              ctx.strokeStyle = `rgba(248, 221, 147, ${alpha})`;
              ctx.lineWidth = 0.3;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    resize();
    initParticles();
    
    if (canvas) {
      observer.observe(canvas);
    }
    
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvas) {
        observer.unobserve(canvas);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'auto' // Remove will-change for better stability
      }}
    />
  );
};

export default AnimatedCanvas;
