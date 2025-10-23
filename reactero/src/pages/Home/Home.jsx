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
      <nav className="home-navbar">
        <Link to="/home" className="home-navbar__link">Home</Link>
        <Link to="/perfil" className="home-navbar__link">Perfil</Link>
        <Link to="/sobre" className="home-navbar__link">Sobre</Link>
      </nav>

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
      {/* Footer simples */}
      <footer className="home-footer">
        <div className="home-footer__content">
          <div className="home-footer__contact">
            <span><strong>Telefone:</strong> (11) 99999-9999</span>
            <span><strong>Email:</strong> equipe@teajuda.com</span>
          </div>
          <div className="home-footer__social">
            <a href="https://www.linkedin.com/in/rzmartins/" aria-label="Bryan">Bryan</a>
            <a href="https://www.linkedin.com/in/pedro-rodrigues-41169031b/?originalSubdomain=br" aria-label="Pedro">Pedro Victor</a>
            <a href=" www.linkedin.com/in/laura-sofia-0a5b06326" aria-label="X">Laura Sophia</a>
            <a href="#" aria-label="Gusta">Gustavo Deodato</a>
            <a href="#" aria-label="Ana">Ana Clara</a>
            <a href="" aria-label="Bia">Beatriz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;