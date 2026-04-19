import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

export default function Home() {
  return (
    <div>
      <section
        className="hero hero-home"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-text hero-front">
          <span className="eyebrow">Premium event catering</span>
          <h1>Elegant food service for weddings, festivals and unforgettable celebrations.</h1>
          <p>We organize full food experiences with Moroccan flavor, modern presentation and professional event service.</p>
          <div className="hero-actions">
            <Link className="pill" to="/menu">Explore Menu</Link>
            <Link className="pill light" to="/contact">Contact us</Link>
          </div>
        </div>

        <div className="hero-card hero-front">
          <h3>Our services</h3>
          <ul>
            <li>Wedding catering</li>
            <li>Festival food stands</li>
            <li>Private parties</li>
            <li>Dessert and tea corners</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Why clients choose us</h2>
        <div className="grid-3">
          <div className="info-card"><h3>Luxury style</h3><p>Beautiful setup and clean presentation for every event.</p></div>
          <div className="info-card"><h3>Flexible menu</h3><p>Traditional and modern dishes adapted to your guests.</p></div>
          <div className="info-card"><h3>Trusted team</h3><p>Reliable service from planning to delivery on event day.</p></div>
        </div>
      </section>
    </div>
  );
}
