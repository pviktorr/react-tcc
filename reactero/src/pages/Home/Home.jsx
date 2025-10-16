import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';
import cor from '../../assets/cor.png';
import mao from '../../assets/mao.png';
import texto from '../../assets/texto.png';

function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { image: cor, alt: 'Coração TEA' },
    { image: mao, alt: 'Inclusão' },
    { image: texto, alt: 'Ajuda' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <div className="home__root">
      {/* Navbar */}
      <header className="navbar">
        <ul>
          <li>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/perfil">
              <span>Perfil</span>
            </Link>
          </li>
          <li className="logo">
            <img src={logo} alt="Logo" />
          </li>
        </ul>
      </header>

      {/* Slideshow */}
      <main className="slideshow-container">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`slide fade`}
            aria-hidden={idx !== slideIndex}
            style={{ display: idx === slideIndex ? 'block' : 'none' }}
          >
            <img src={s.image} alt={s.alt} />
          </div>
        ))}

        <div className="dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === slideIndex ? 'active' : ''}`}
              onClick={() => currentSlide(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;