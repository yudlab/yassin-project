import React, { useState, useEffect } from 'react';
import './home.scss';
import LoadingAnimation from '../../COMPONENTS/Loader/Loader'; // Make sure to import the animation component

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (for example, fetching data, etc.)
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading time
  }, []);

  return (
    <div className="home">
      {loading ? (
        <LoadingAnimation /> // Show the loading animation while the page is loading
      ) : (
        <>
          <header className="header">
            <h1 className="logo">Contracting Services</h1>
            <nav>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </header>
          
          <section id="about" className="about-section">
            <h2>About Us</h2>
            <p>We are a trusted contracting company providing quality building services for residential and commercial projects. With over 20 years of experience, we ensure every project is done right and on time.</p>
          </section>

          <section id="services" className="services-section">
            <h2>Our Services</h2>
            <div className="service-item">
              <h3>Residential Construction</h3>
              <p>We offer complete residential construction services, from foundations to finishing touches.</p>
            </div>
            <div className="service-item">
              <h3>Commercial Construction</h3>
              <p>Our commercial services include office spaces, retail stores, and industrial facilities.</p>
            </div>
            <div className="service-item">
              <h3>Renovation & Remodeling</h3>
              <p>We specialize in home and office remodeling to match your vision and needs.</p>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <h2>Contact Us</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>

          <footer className="footer">
            <p>&copy; 2025 Contracting Services. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default Home;
