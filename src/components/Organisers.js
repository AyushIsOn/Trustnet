import React from 'react';
import ChromaGrid from './ChromaGrid';

const Organisers = () => {
  return (
    <div className="organisers-page">
      <div className="page-container">
        <section className="organisers-section">
          <div className="organisers-header">
            <button 
              className="home-button"
              onClick={() => window.location.href = '/'}
            >
              ← Home
            </button>
            <h1 className="organisers-title">
              Conference Organisers
            </h1>
          </div>
          <p className="organisers-description">
            Meet the organizing committee behind TrustNet 2026.
          </p>
          
          <ChromaGrid 
            items={[
              {
                image: require('../assets/Dr Kuldip Singh Sangwan.jpeg'),
                title: "Dr Kuldip Singh Sangwan",
                subtitle: "Dean, Faculty of Science, Technology and Architecture",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(145deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/kuldip-singh-sangwan-331a25b6",
              },
              {
                image: require('../assets/Dr Chhattar Singh Lamba.jpeg'),
                title: "Dr Chhattar Singh Lamba",
                subtitle: "Associate Dean, CSE",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(210deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/professorlamba",
              },
              {
                image: require('../assets/Dr Neha Chaudhary.jpeg'),
                title: "Dr Neha Chaudhary",
                subtitle: "Professor & Head, CSE",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(165deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/dr-neha-chaudhary-2b02bb31",
              },
              {
                image: require('../assets/Dr Amit Soni.jpeg'),
                title: "Dr Amit Soni",
                subtitle: "Registrar",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(195deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/dr-amit-soni-9b810812",
              },
              {
                image: require('../assets/Dr. Amit Garg.jpeg'),
                title: "Dr. Amit Garg",
                subtitle: "Assistant Professor, CSE Convener",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />, 
                borderColor: "#fae7b2",
                gradient: "linear-gradient(225deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/dr-amit-garg-87461637/?originalSubdomain=in",
              },
              {
                image: require('../assets/Dr. Jay Prakash Singh.jpeg'),
                title: "Dr. Jay Prakash Singh",
                subtitle: "Assistant Professor, CSE Co-Convener",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(135deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/jay-prakash-kiit/?originalSubdomain=in",
              },
              {
                image: require('../assets/Dr. Satyabrata Roy.jpeg'),
                title: "Dr. Satyabrata Roy",
                subtitle: "Associate Professor, CSE Program Co-Chair",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(270deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/dr-satyabrata-roy-7b7a6253/?originalSubdomain=in",
              },
              {
                image: require('../assets/Dr. Umashankar Rawat.jpeg'),
                title: "Dr. Umashankar Rawat",
                subtitle: "Associate Professor, CSE Program Co-Chair",
                handle: <img src={require('../assets/Linkedin_white.png')} alt="LinkedIn" style={{height: '20px', verticalAlign: 'middle'}} />,
                borderColor: "#fae7b2",
                gradient: "linear-gradient(315deg, #f8dd93, #000)",
                url: "https://www.linkedin.com/in/umashankar-rawat-41730a48/?originalSubdomain=in",
              },
            ]}
            columns={3}
            rows={3}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </section>
      </div>
    </div>
  );
};

export default Organisers;
