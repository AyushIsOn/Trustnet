import React, { useState, useEffect, useRef } from 'react';

const ScrambleText = ({ 
  text, 
  className = '', 
  scrambleChars = '01!@#$%^&*()_+-=[]{}|;:,.<>?',
  animationSpeed = 50,
  revealSpeed = 100,
  trigger = 'hover',
  autoplay = false,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const elementRef = useRef(null);

  const scrambleText = (iterations = 3) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const originalText = text;
    
    const animate = () => {
      setDisplayText(prevText => 
        originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );
      
      if (iteration >= originalText.length) {
        setDisplayText(originalText);
        setIsAnimating(false);
        return;
      }
      
      iteration += 1 / iterations;
    };
    
    intervalRef.current = setInterval(animate, animationSpeed);
    
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setDisplayText(originalText);
      setIsAnimating(false);
    }, originalText.length * revealSpeed);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scrambleText();
    }
  };

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        scrambleText();
      }, delay);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoplay, delay]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      ref={elementRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: trigger === 'hover' ? 'pointer' : 'default' }}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
