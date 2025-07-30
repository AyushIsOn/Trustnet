import React, { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';

const MetallicPaintLogo = ({ width = 120, height = 120, className = "" }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Optimized parameters for logo display
  const params = {
    edge: 0,
    patternScale: 1.8,
    patternBlur: 0.012,
    refraction: 0.015,
    liquid: 0.08,
    speed: 0.2,
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const response = await fetch('/group27.svg');
        const svgText = await response.text();
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const file = new File([blob], 'group27.svg', { type: 'image/svg+xml' });
        const { imageData } = await parseLogoImage(file);
        setImageData(imageData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading MetallicPaint logo:', error);
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  if (loading) {
    return (
      <div 
        className={`metallic-paint-logo-loading ${className}`}
        style={{ width, height }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!imageData) {
    return null; // Fail silently and don't render anything
  }

  return (
    <div 
      className={`metallic-paint-logo ${className}`}
      style={{ width, height }}
    >
      <MetallicPaint 
        imageData={imageData}
        params={params}
      />
    </div>
  );
};

export default MetallicPaintLogo;
