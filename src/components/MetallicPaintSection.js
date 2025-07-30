import React, { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';

const MetallicPaintSection = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parameters from the CLI version
  const params = {
    edge: 0,
    patternScale: 2.2,
    patternBlur: 0.014,
    refraction: 0.02,
    liquid: 0.11,
    speed: 0.3,
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        // Fetch the SVG file
        const response = await fetch('/group27.svg');
        const svgText = await response.text();
        
        // Create a blob from the SVG text
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const file = new File([blob], 'group27.svg', { type: 'image/svg+xml' });
        
        // Parse the image
        const { imageData } = await parseLogoImage(file);
        setImageData(imageData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading image:', error);
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  return (
    <section className="metallic-paint-section">
      <div className="metallic-paint-container">
        {loading ? (
          <div className="metallic-paint-loading">
            <div className="loading-text">Loading Effect...</div>
          </div>
        ) : imageData ? (
          <div className="metallic-paint-wrapper">
            <MetallicPaint 
              imageData={imageData}
              params={params}
            />
          </div>
        ) : (
          <div className="metallic-paint-error">
            <div className="error-text">Failed to load effect</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MetallicPaintSection;
