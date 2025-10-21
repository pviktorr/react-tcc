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
      {/* Navbar animada com SVG */}
      <div className="nav">
        <div className="container">
          <div className="btn">Home</div>
          <div className="btn">Contact</div>
          <div className="btn">About</div>
          <div className="btn">FAQ</div>
          <svg
            className="outline"
            overflow="visible"
            width="400"
            height="60"
            viewBox="0 0 400 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="rect"
              pathLength="100"
              x="0"
              y="0"
              width="400"
              height="60"
              fill="transparent"
              strokeWidth="5"
            ></rect>
          </svg>
        </div>
      </div>

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