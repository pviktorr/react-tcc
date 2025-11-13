    import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';

function Home() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/home" className="navbar-logo">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <div className="menu">
            <Link to="/home" className="menu-link active">Home</Link>
            <Link to="/perfil" className="menu-link">Perfil</Link>
            <Link to="/calendario" className="menu-link">Calendário</Link>
            <Link to="/localidade" className="menu-link">Localidades</Link>
            <Link to="/sobre" className="menu-link">Sobre</Link>
          </div>
        </div>
      </nav>

      
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo ao TeAjuda</h1>
          <p>Uma plataforma dedicada a apoiar pessoas com Transtorno do Espectro Autista e suas famílias</p>
          <div className="cta-buttons">
            <Link to="/cadastro" className="btn btn-primary">Comece Agora</Link>
            <Link to="/sobre" className="btn btn-secondary">Saiba Mais</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Nossos Recursos</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Objetivos Personalizados</h3>
            <p>Estabeleça e acompanhe objetivos de desenvolvimento individualizados.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Acompanhamento</h3>
            <p>Monitore o progresso com relatórios detalhados e fáceis de entender.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Suporte Familiar</h3>
            <p>Recursos e ferramentas para toda a família.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre Nós</h2>
            <p>O TeAjuda nasceu da necessidade de criar uma ponte entre profissionais, famílias e pessoas no espectro autista, oferecendo ferramentas que facilitam o acompanhamento e desenvolvimento contínuo.</p>
            <Link to="/sobre" className="btn btn-outline">Conheça nossa história</Link>
          </div>
          
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations">
        <div className="locations-content">
          <h2>Encontre Locais de Apoio</h2>
          <p>Descubra clínicas, escolas e locais especializados em TEA próximos a você.</p>
          <div className="locations-grid">
            <div className="location-card">
              <div className="location-icon">🏥</div>
              <h3>Clínicas</h3>
              <p>Encontre profissionais especializados em TEA</p>
            </div>
            <div className="location-card">
              <div className="location-icon">🏫</div>
              <h3>Escolas</h3>
              <p>Instituições com metodologias inclusivas</p>
            </div>
            <div className="location-card">
              <div className="location-icon">🏠</div>
              <h3>Lazer</h3>
              <p>Lugares acolhedores para momentos de diversão</p>
            </div>
          </div>
          <Link to="/localidade" className="btn btn-outline">Ver Mapa Completo</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Pronto para começar?</h2>
        <p>Junte-se a nós e descubra como podemos ajudar no desenvolvimento e acompanhamento.</p>
        <Link to="/cadastro" className="btn btn-primary btn-large">Criar Conta Gratuita</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contato</h4>
            <p><strong>Email:</strong> equipe@teajuda.com</p>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
          </div>
          <div className="footer-section">
            <h4>Equipe</h4>
            <div className="team-links">
              <a href="https://www.linkedin.com/in/rzmartins/" target="_blank" rel="noopener noreferrer">Bryan</a>
              <a href="https://www.linkedin.com/in/pedro-rodrigues-41169031b/" target="_blank" rel="noopener noreferrer">Pedro Victor</a>
              <a href="https://www.linkedin.com/in/laura-sofia-0a5b06326" target="_blank" rel="noopener noreferrer">Laura Sophia</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Gustavo Deodato</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Ana Clara</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Beatriz</a>
            </div>
          </div>
       
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TeAjuda. Todos os direitos reservados.</p>
                </div>
      </footer>
    </div>
  );
}






export default Home;