import React from 'react';
import SpotlightCard from './SpotlightCard';
import springerLogo from '../assets/springer-logo.png';
import './HighlightsGrid.css';

const HighlightsGrid = ({ items }) => {
  // Default highlights for the About section if no items passed
  const defaultHighlights = [
    {
      title: "Panel Discussions", 
      description: "Ethics, policy, and future trends in AI and security"
    },
    {
      title: "Paper & Poster Presentations",
      description: "Leading AI and security experts sharing cutting-edge insights"
    },
    {
      title: "Symposium",
      description: "Interactive sessions bringing together industry and academia"
    },
    {
      title: "Industry Connection",
      description: "Networking opportunities with leading technology companies and startups"
    }
  ];

  const highlights = items || defaultHighlights;

  return (
    <div className={`highlights-grid ${items ? 'full-width' : ''}`}>
      <div className={`highlights-section ${items ? 'publications-layout' : ''}`}>
        {highlights.map((highlight, index) => (
          <SpotlightCard key={index} className="highlight-card" spotlightColor="rgba(248, 221, 147, 0.3)">
            <h3 className="highlight-title">{highlight.title}</h3>
            <p className="highlight-description">{highlight.description}</p>
          </SpotlightCard>
        ))}
      </div>
      
      {!items && (
        <div className="publication-section">
          <SpotlightCard className="publication-card" spotlightColor="rgba(248, 221, 147, 0.3)">
            <div className="springer-logo">
              <img src={springerLogo} alt="Springer" />
            </div>
            <div className="publication-content">
              <h3>Publication</h3>
              <p>Accepted papers will be published in a SCOPUS-indexed Springer Book Series</p>
            </div>
          </SpotlightCard>
        </div>
      )}
    </div>
  );
};

export default HighlightsGrid;
