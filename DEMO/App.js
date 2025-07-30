import React, { useEffect, useState } from 'react';
import LetterGlitch from './components/LetterGlitch';
import HighlightsGrid from './components/HighlightsGrid';
import SpotlightCard from './components/SpotlightCard';
import ChromaGrid from './components/ChromaGrid';
import ScrambleText from './components/ScrambleText';
import AnimatedCanvas from './components/AnimatedCanvas';
import Organisers from './components/Organisers';
import MetallicPaintLogo from './components/MetallicPaintLogo';
import logoHeader from './assets/trustnetlogo-white.png';
import dotsPattern from './assets/dots-use-cases.png';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const subNav = document.getElementById('sub-nav');
    const mainNav = document.querySelector('.fixed-nav');
    let subNavOriginalTop = null;

    // Early return if elements don't exist
    if (!subNav || !mainNav) {
      console.warn('Navigation elements not found');
      return;
    }

    // Store the original position of sub-nav
    const setOriginalPosition = () => {
      if (subNavOriginalTop === null && subNav) {
        // Wait for layout to be complete
        const rect = subNav.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        subNavOriginalTop = rect.top + scrollTop;
        console.log('Sub-nav original position set to:', subNavOriginalTop);
      }
    };

    const handleScroll = () => {
      if (subNavOriginalTop === null) {
        setOriginalPosition();
      }

      const scrollTop = window.pageYOffset;
      const mainNavHeight = mainNav ? mainNav.offsetHeight : 70;
      const triggerPoint = subNavOriginalTop - mainNavHeight - 10; // Add small buffer

      // Handle sticky navigation with improved logic
      if (scrollTop >= triggerPoint && subNavOriginalTop !== null) {
        // When we reach the sub-nav, make it stick to top and hide main nav
        if (!subNav.classList.contains('sticky')) {
          subNav.classList.add('sticky');
        }
        if (mainNav.style.transform !== 'translateY(-100%)') {
          mainNav.style.transform = 'translateY(-100%)';
          mainNav.style.transition = 'transform 0.3s ease';
        }
      } else {
        // Show main nav and make sub-nav follow normal flow
        if (subNav.classList.contains('sticky')) {
          subNav.classList.remove('sticky');
        }
        if (mainNav.style.transform !== 'translateY(0)') {
          mainNav.style.transform = 'translateY(0)';
          mainNav.style.transition = 'transform 0.3s ease';
        }
      }

      // Handle active section highlighting and video playback
      const sections = document.querySelectorAll('.content-section');
      const navLinks = document.querySelectorAll('.sub-nav-links .nav-item');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (scrollTop >= (sectionTop - 100)) {
          currentSection = section.getAttribute('id');
        }
      });

      // Handle video playback for venue section
      const venueVideo = window.venueVideo;
      if (venueVideo) {
        if (currentSection === 'venue') {
          // Force play the video when in venue section
          if (venueVideo.paused) {
            // Try multiple times to ensure it plays
            const attemptPlay = async () => {
              try {
                await venueVideo.play();
                console.log('Video playing successfully');
              } catch (e) {
                console.log('Video autoplay prevented, trying again:', e);
                // Try again after a short delay
                setTimeout(async () => {
                  try {
                    await venueVideo.play();
                  } catch (err) {
                    console.log('Video autoplay still prevented:', err);
                  }
                }, 500);
              }
            };
            attemptPlay();
          }
        } else {
          // Pause video when not in venue section
          if (!venueVideo.paused) {
            venueVideo.pause();
          }
        }
      }

      // Update navigation active states
      navLinks.forEach(navItem => {
        const link = navItem.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          if (href === '#' + currentSection) {
            navItem.classList.add('active');
            console.log('Active section:', currentSection, 'Nav item activated');
          } else {
            navItem.classList.remove('active');
          }
        }
      });
    };

    // Smooth scroll functionality for footer navigation
    const addSmoothScrolling = () => {
      const footerNavLinks = document.querySelectorAll('.footer-nav-link[href^="#"]');
      
      footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Add visual feedback
            link.style.color = '#f8dd93';
            setTimeout(() => {
              link.style.color = '';
            }, 300);
          }
        });
      });
    };

    // Initialize video loading
    const initializeVideo = () => {
      setTimeout(() => {
        const venueVideo = window.venueVideo;
        if (venueVideo) {
          // Force load the video metadata and first frame
          venueVideo.load();
          
          // Add comprehensive event listeners
          venueVideo.addEventListener('canplay', () => {
            console.log('Video is ready to play');
            // Try to play immediately if we're in the venue section
            const venueSection = document.getElementById('venue');
            if (venueSection) {
              const rect = venueSection.getBoundingClientRect();
              const isInView = rect.top < window.innerHeight && rect.bottom > 0;
              if (isInView && venueVideo.paused) {
                venueVideo.play().catch(e => console.log('Initial autoplay prevented:', e));
              }
            }
          });
          
          venueVideo.addEventListener('loadstart', () => {
            console.log('Video loading started');
          });
          
          venueVideo.addEventListener('loadedmetadata', () => {
            console.log('Video metadata loaded');
          });
          
          // Add user interaction event to enable autoplay
          const enableAutoplay = () => {
            venueVideo.muted = true; // Ensure it's muted for autoplay
            document.removeEventListener('click', enableAutoplay);
            document.removeEventListener('touchstart', enableAutoplay);
          };
          
          document.addEventListener('click', enableAutoplay);
          document.addEventListener('touchstart', enableAutoplay);
        }
      }, 500); // Reduced delay to start loading sooner
    };

    // Initialize scroll handler
    window.addEventListener('scroll', handleScroll);
    
    // Set original position after a delay to ensure DOM is ready
    setTimeout(() => {
      setOriginalPosition();
      // Trigger initial scroll check
      handleScroll();
    }, 100);
    
    // Initialize smooth scrolling when component mounts
    setTimeout(addSmoothScrolling, 200);
    
    // Initialize video loading
    initializeVideo();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Fixed Navigation Header */}
      <nav className="fixed-nav">
        <div className="nav-container">
          <div className="logo">
            <img 
              src={logoHeader} 
              alt="Trustnet Logo" 
              className="logo-image" 
              onClick={() => setCurrentPage('home')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="nav-links">
            <a href="#organisers" onClick={(e) => { e.preventDefault(); setCurrentPage('organisers'); }}>
              <ScrambleText 
                text="Organisers"
                className="main-nav-scramble"
                scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                animationSpeed={8}
                revealSpeed={20}
                trigger="hover"
              />
            </a>
            <a href="#venue" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <ScrambleText 
                text="Venue"
                className="main-nav-scramble"
                scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                animationSpeed={8}
                revealSpeed={20}
                trigger="hover"
              />
            </a>
            <div className="nav-actions">
              <select className="language-selector">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="hi">हिन्दी</option>
              </select>
              <button className="book-demo-btn">Register Now</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional Page Rendering */}
      {currentPage === 'organisers' ? (
        <Organisers />
      ) : (
        <>
          {/* Hero Section with Background Effects */}
          <section className="hero-section">
        <div className="page-container">
          <div className="hero-background">
            <LetterGlitch
              glitchColors={['#f8dd93', '#fdf5dd', '#bebebe']}
              glitchSpeed={95}
              centerVignette={true}
              outerVignette={true}
              smooth={true}
            />
          </div>
          
          <div className="hero-content">
            <div className="department-text">
              Department of Computer Science and Engineering, Manipal University, Jaipur
            </div>
            
            <h1 className="conference-title">
              <div className="title-line">
                Trust Net: International
              </div>
              <div className="title-line">
                Conference on Trusted Networks and Intelligent
              </div>
              <div className="title-line">
                Systems
              </div>
            </h1>
            
            <div className="conference-date">
              <ScrambleText 
                text="FEB 6-7, 2025"
                className="date-scramble"
                scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                animationSpeed={10}
                revealSpeed={25}
                autoplay={true}
                delay={1000}
              />
            </div>
            
            <div className="hero-actions">
              <button className="book-demo-btn primary">Register Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sub Navigation Header */}
      <nav className="sub-nav" id="sub-nav">
        <div className="sub-nav-container">
          <div className="sub-nav-links">
            <div className="nav-item">
              <div className="nav-effect">
                <img src={dotsPattern} alt="Navigation Effect" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <a href="#about-conference">
                <ScrambleText 
                  text="About the Conference"
                  className="sub-nav-scramble"
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  animationSpeed={8}
                  revealSpeed={20}
                  trigger="hover"
                />
              </a>
            </div>
            <div className="nav-item">
              <div className="nav-effect">
                <img src={dotsPattern} alt="Navigation Effect" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <a href="#dates-registration">
                <ScrambleText 
                  text="Important Dates & Registration"
                  className="sub-nav-scramble"
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  animationSpeed={8}
                  revealSpeed={20}
                  trigger="hover"
                />
              </a>
            </div>
            <div className="nav-item">
              <div className="nav-effect">
                <img src={dotsPattern} alt="Navigation Effect" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <a href="#speakers">
                <ScrambleText 
                  text="Speakers"
                  className="sub-nav-scramble"
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  animationSpeed={8}
                  revealSpeed={20}
                  trigger="hover"
                />
              </a>
            </div>
            <div className="nav-item">
              <div className="nav-effect">
                <img src={dotsPattern} alt="Navigation Effect" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <a href="#publications">
                <ScrambleText 
                  text="Publications & Call for Papers"
                  className="sub-nav-scramble"
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  animationSpeed={8}
                  revealSpeed={20}
                  trigger="hover"
                />
              </a>
            </div>
            <div className="nav-item">
              <div className="nav-effect">
                <img src={dotsPattern} alt="Navigation Effect" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <a href="#venue">
                <ScrambleText 
                  text="Venue"
                  className="sub-nav-scramble"
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  animationSpeed={8}
                  revealSpeed={20}
                  trigger="hover"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="page-container">
          <section id="about-conference" className="content-section">
            <h2>About the Conference</h2>
            <p>The Department of Computer Science and Engineering at Manipal University Jaipur (MUJ) is excited to host the first International Conference on Trusted Networks and Intelligent Systems (TrustNet-2026). This global event invites researchers, academicians, and industry experts to present cutting-edge work in Security and Artificial Intelligence (AI), fostering interdisciplinary dialogue and innovation.</p>
            
            <HighlightsGrid />
          </section>

          <section id="dates-registration" className="content-section">
            <h2>Important Dates & Registration</h2>
            <p>The Department of Computer Science and Engineering at Manipal University Jaipur (MUJ) welcomes participants from around the world. Registration is now open with competitive pricing for different categories.</p>
            
            <div className="registration-container">
              <div className="important-dates">
                <h3>Important Dates</h3>
                <SpotlightCard className="date-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                  <div className="date-item">
                    <strong>Call for Papers:</strong> Tuesday, September 9, 2025
                  </div>
                  <div className="date-item">
                    <strong>Last Date of Paper Submission:</strong> Saturday, November 15, 2025
                  </div>
                  <div className="date-item">
                    <strong>Notification of Acceptance:</strong> Monday, December 15, 2025
                  </div>
                  <div className="date-item">
                    <strong>Camera Ready Paper Submission:</strong> Thursday, December 25, 2025
                  </div>
                  <div className="date-item">
                    <strong>Registration End Date:</strong> Sunday, January 5, 2026
                  </div>
                  <div className="date-item conference-dates">
                    <strong>Conference Date:</strong> February 6-7, 2026
                  </div>
                </SpotlightCard>
              </div>
              
              <div className="registration-details">
                <h3>Registration Fees</h3>
                <SpotlightCard className="registration-table-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                  <div className="registration-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Indian (INR)</th>
                          <th>International (USD)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Students / Researchers</td>
                          <td>₹9,500</td>
                          <td>$200</td>
                        </tr>
                        <tr>
                          <td>Academicians</td>
                          <td>₹10,500</td>
                          <td>$250</td>
                        </tr>
                        <tr>
                          <td>Industry Participants</td>
                          <td>₹12,500</td>
                          <td>$300</td>
                        </tr>
                        <tr>
                          <td>Attendee only</td>
                          <td>₹2,500</td>
                          <td>$100</td>
                        </tr>
                       
                      </tbody>
                    </table>
                    <p className="fee-note"><strong>Note:</strong> Fee is inclusive of 18% GST.</p>
                    <div className="registration-actions">
                      <button className="register-btn primary">Register Now</button>
                      <button className="guidelines-btn secondary">Registration Guidelines</button>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </section>

          <section id="speakers" className="content-section">
            <h2>Speakers</h2>
            <p>We're excited to announce our lineup of world-renowned cybersecurity experts and thought leaders.</p>
            <p>Sessions will cover topics including AI-driven security, zero-trust architecture, threat intelligence, and emerging cyber threats.</p>
          </section>

        <ChromaGrid 
          items={[
            {
              image: "https://i.pravatar.cc/300?img=8",
              title: "Alex Rivera",
              subtitle: "Full Stack Developer",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />, 
              borderColor: "#fae7b2",
              gradient: "linear-gradient(145deg, #f8dd93, #000)",
              url: "https://github.com/",
            },
            {
              image: "https://i.pravatar.cc/300?img=11",
              title: "Jordan Chen",
              subtitle: "DevOps Engineer",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
              borderColor: "#fae7b2",
              gradient: "linear-gradient(210deg, #f8dd93, #000)",
              url: "https://linkedin.com/in/",
            },
            {
              image: "https://i.pravatar.cc/300?img=3",
              title: "Morgan Blake",
              subtitle: "UI/UX Designer",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
              borderColor: "#fae7b2",
              gradient: "linear-gradient(165deg, #f8dd93, #000)",
              url: "https://dribbble.com/",
            },
            {
              image: "https://i.pravatar.cc/300?img=16",
              title: "Casey Park",
              subtitle: "Data Scientist",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
              borderColor: "#fae7b2",
              gradient: "linear-gradient(195deg, #f8dd93, #000)",
              url: "https://kaggle.com/",
            },
            {
              image: "https://i.pravatar.cc/300?img=25",
              title: "Sam Kim",
              subtitle: "Mobile Developer",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
              borderColor: "#fae7b2",
              gradient: "linear-gradient(225deg, #f8dd93, #000)",
              url: "https://github.com/",
            },
            {
              image: "https://i.pravatar.cc/300?img=60",
              title: "Tyler Rodriguez",
              subtitle: "Cloud Architect",
               handle: <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
              borderColor: "#fae7b2",
              gradient: "linear-gradient(135deg, #f8dd93, #000)",
              url: "https://aws.amazon.com/",
            },
          ]}
          columns={3}
          rows={2}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />

          <section id="publications" className="content-section">
            <h2>Publications & Call for Papers</h2>
            
            <p>We invite researchers, practitioners, and scholars to contribute original and impactful work to TrustNet-2026. The conference welcomes submissions in a wide range of interdisciplinary domains related to security and intelligent systems.</p>
            
            <p>The key tracks and submission guidelines are as follows:</p>
            
            <div className="publications-layout">
              <div className="tracks-column">
                <div className="tracks-grid">
                  <SpotlightCard className="track-card rectangular-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Trusted & Secure Communication</h3>
                  </SpotlightCard>
                  <SpotlightCard className="track-card rectangular-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">AI for Cybersecurity</h3>
                  </SpotlightCard>
                  <SpotlightCard className="track-card rectangular-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Blockchain & IoT Security</h3>
                  </SpotlightCard>
                  <SpotlightCard className="track-card rectangular-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Embedded Communication Security</h3>
                  </SpotlightCard>
                </div>
              </div>
              
              <div className="guidelines-column">
                <div className="guidelines-grid">
                  <SpotlightCard className="guideline-card square-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Formatting Requirements</h3>
                    <p className="highlight-description">Use the official ACL template (LaTeX or Word)</p>
                  </SpotlightCard>
                  <SpotlightCard className="guideline-card square-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Policy Regarding Simultaneous Submission</h3>
                    <p className="highlight-description">No simultaneous submissions to other conferences or journals.</p>
                  </SpotlightCard>
                  <SpotlightCard className="guideline-card square-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Anonymous Submissions</h3>
                    <p className="highlight-description">Submissions should be in review mode (no author names or affiliations).</p>
                  </SpotlightCard>
                  <SpotlightCard className="guideline-card square-card" spotlightColor="rgba(248, 221, 147, 0.3)">
                    <h3 className="highlight-title">Page Limit Extension</h3>
                    <p className="highlight-description">Accepted papers may include 1 additional page (max 9 for long, 5 for short papers).</p>
                  </SpotlightCard>
                </div>
                
                <div className="submission-countdown-section">
                  <div className="countdown-timer">
                    <span className="countdown-label">Submission Deadline:</span>
                    <span className="countdown-time">00:00:00:00</span>
                  </div>
                  <button className="submit-work-btn primary">Submit Your Work</button>
                </div>
              </div>
            </div>
          </section>

          <section id="venue" className="content-section">
            <h2>Venue</h2>
            <p>The conference will be held at Manipal University Jaipur, a premier institution known for its state-of-the-art facilities and beautiful campus.</p>
            
            <div className="venue-content-grid">
              <div className="venue-video-container">
                <video 
                  ref={(el) => {
                    if (el) {
                      window.venueVideo = el;
                      // Set up video event listeners for better control
                      el.addEventListener('loadeddata', () => {
                        console.log('Video loaded successfully');
                      });
                      el.addEventListener('error', (e) => {
                        console.error('Video error:', e);
                      });
                      el.addEventListener('canplaythrough', () => {
                        console.log('Video can play through');
                      });
                    }
                  }}
                  className="venue-video"
                  controls
                  preload="auto"
                  muted
                  loop
                  playsInline
                  autoPlay
                  poster="/logoheader.png"
                >
                  <source src="/MUJ_Venue_compressed.webm" type="video/webm" />
                  <source src="/MUJ_Venue.webm" type="video/webm" />
                  <p>Your browser does not support the video tag. Please update your browser to view the venue video.</p>
                </video>
              </div>
              
              <div className="venue-map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14240.349047930216!2d75.56260345!3d26.8371767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4850e05bee9b%3A0x1b8d67402d4eb863!2sManipal%20University%20Jaipur!5e0!3m2!1sen!2sin!4v1753832548172!5m2!1sen!2sin" 
                  className="venue-map"
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manipal University Jaipur Location"
                ></iframe>
              </div>
            </div>
            
            <p>Address: Dehmi-Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Express Highway, Jaipur, Rajasthan 303007, India</p>
          </section>
        </div>
      </main>

      {/* Advanced Footer */}
      <footer className="advanced-footer">
        <div className="footer-canvas-container">
          <AnimatedCanvas className="footer-canvas" />
        </div>
        
        <div className="footer-content-wrapper">
          <div className="footer-main-content">
            
            {/* Logo and Conference Title Section */}
            <div className="footer-brand-section">
              <div className="footer-logo-container">
                <MetallicPaintLogo 
                  width={450} 
                  height={270} 
                  className="footer-brand-logo metallic-paint-logo" 
                />
              </div>
              <div className="footer-title-section">
                <h2 className="footer-conference-title">
                  <ScrambleText 
                    text="TRUSTNET"
                    className="scramble-title"
                    scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%^&*"
                    animationSpeed={30}
                    revealSpeed={80}
                    trigger="hover"
                  />
                </h2>
                <p className="footer-conference-subtitle">
                  International Conference on Trusted Networks and Intelligent Systems
                </p>
                <div className="footer-conference-details">
                  <span className="footer-date">FEB 6-7, 2025</span>
                  <span className="footer-divider">•</span>
                  <span className="footer-location">Manipal University Jaipur</span>
                </div>
              </div>
            </div>

            {/* Navigation and Quick Links */}
            <div className="footer-nav-section">
              <div className="footer-nav-column">
                <h3 className="footer-nav-title">Conference</h3>
                <div className="footer-nav-links">
                  <a href="#about-conference" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('about-conference')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>About</a>
                  <a href="#speakers" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Speakers</a>
                  <a href="#schedule" className="footer-nav-link">Schedule</a>
                  <a href="#dates-registration" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('dates-registration')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Registration</a>
                </div>
              </div>
              
              <div className="footer-nav-column">
                <h3 className="footer-nav-title">Participate</h3>
                <div className="footer-nav-links">
                  <a href="#publications" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Call for Papers</a>
                  <a href="#workshops" className="footer-nav-link">Workshops</a>
                  <a href="#organisers" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('organisers'); }}>Organisers</a>
                  <a href="#venue" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Venue</a>
                </div>
              </div>
              
              <div className="footer-nav-column">
                <h3 className="footer-nav-title">Resources</h3>
                <div className="footer-nav-links">
                  <a href="#venue" className="footer-nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setTimeout(() => document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Venue</a>
                  <a href="#submission-format" className="footer-nav-link">Submission Format</a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="footer-interactive-section">
            <div className="footer-social-container">
              <h3 className="footer-social-title">Connect With Us</h3>
              <div className="footer-social-links">
                <a href="https://www.linkedin.com/company/manipal-university-jaipur" 
                   className="footer-social-item highlight-grid-item" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="LinkedIn">
                  <div className="social-icon-wrapper">
                    <img src={require('./assets/Linkedin_white.png')} alt="LinkedIn" className="social-icon" />
                  </div>
                  <span className="social-label">LinkedIn</span>
                </a>
                
                <a href="https://twitter.com/mujaipur" 
                   className="footer-social-item highlight-grid-item" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Twitter">
                  <div className="social-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                  </div>
                  <span className="social-label">Twitter</span>
                </a>
                
                <a href="https://youtube.com/@manipaluniversityjaipur" 
                   className="footer-social-item highlight-grid-item" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="YouTube">
                  <div className="social-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="social-label">YouTube</span>
                </a>
                
                <a href="mailto:info@cybersecurityconf.com" 
                   className="footer-social-item highlight-grid-item"
                   aria-label="Email">
                  <div className="social-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="social-label">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-content">
              <div className="footer-copyright-section">
                <p className="footer-copyright">
                  © 2025 <ScrambleText text="Manipal University Jaipur" scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ" trigger="hover" />. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}

export default App;
