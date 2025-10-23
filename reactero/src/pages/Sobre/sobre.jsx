
import { Link } from 'react-router-dom';
import './Sobre.css';


function Sobre() {
    return (
        <div className="sobre__root">
            {/* Navbar */}
            <div className="nav">
                <div className="container">
                    <Link to="/home" className="btn">Home</Link>
                    <Link to="/perfil" className="btn">Perfil</Link>
                    <Link to="/sobre" className="btn">Sobre</Link>
                    
                    
                </div>
            </div>

            <main className="sobre-container">
                <div className="sobre-content">
                    <h1 className="sobre-title">Sobre o Projeto</h1>
                    
                    <section className="sobre-section">
                        <h2>Objetivo</h2>
                        <p>Seu texto sobre o objetivo do projeto aqui...</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Quem Somos</h2>
                        <p>Seu texto sobre a equipe aqui...</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Nossa Missão</h2>
                        <p>Sua descrição da missão aqui...</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Como Funciona</h2>
                        <p>Sua explicação sobre o funcionamento aqui...</p>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="sobre-footer">
                <div className="sobre-footer__content">
                    <div className="sobre-footer__contact">
                        <span><strong>Telefone:</strong> (11) 99999-9999</span>
                        <span><strong>Email:</strong> equipe@teajuda.com</span>
                    </div>
                    <div className="sobre-footer__social">
                        <a href="https://www.linkedin.com/in/rzmartins/" aria-label="Bryan">Bryan</a>
                        <a href="https://www.linkedin.com/in/pedro-rodrigues-41169031b/?originalSubdomain=br" aria-label="Pedro">Pedro Victor</a>
                        <a href="www.linkedin.com/in/laura-sofia-0a5b06326" aria-label="X">Laura Sophia</a>
                        <a href="https://www.linkedin.com/in/gustavo-silva-deodato-76651b284/" aria-label="Gusta">Gustavo Deodato</a>
                        <a href="#" aria-label="Ana">Ana Clara</a>
                        <a href="" aria-label="Bia">Beatriz</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Sobre;
