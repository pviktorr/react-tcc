
import { Link } from 'react-router-dom';
import './Sobre.css';


function Sobre() {
    return (
        <div className="sobre__root">
            {/* Navbar */}
            <div className="nav">
                <div className="container">
                    <Link to="/" className="btn">Home</Link>
                    <Link to="/perfil" className="btn">Perfil</Link>
                    <Link to="/sobre" className="btn">Sobre</Link>
                    
                    
                </div>
            </div>

            <main className="sobre-container">
                <div className="sobre-content">
                    <h1 className="sobre-title">Sobre o Projeto</h1>
                    
                    <section className="sobre-section">
                        <h2>Objetivo</h2>
                        <p>O objetivo fundamental do TeAjuda é revolucionar a qualidade e a eficácia do registro e dos cuidados direcionados a pessoas no espectro autista (TEA). Partimos do princípio de que informações precisas, organizadas e acessíveis são a base para qualquer evolução significativa.</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Quem Somos</h2>
                        <p>A jornada no Transtorno do Espectro Autista é única para cada indivíduo e sua família. Foi para simplificar e unificar essa trajetória que o TeAjuda foi criado. Mais do que uma plataforma, somos uma ponte digital que conecta terapêutas, educadores e famílias às pessoas autistas, centralizando informações e otimizando a evolução de todos.

Através de ferramentas inovadoras, facilitamos o registro de progressos, a comunicação entre a rede de apoio e a implementação de estratégias personalizadas. Nosso objetivo é ser o aliado que transforma desafios em caminhos possíveis, garantindo um desenvolvimento contínuo e uma vida mais plena.

</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Nossa Missão</h2>
                        <p>Nossa missão é potencializar o desenvolvimento e a qualidade de vida de pessoas no espectro autista, criando uma rede de cuidado integrada e baseada em dados. Através da nossa plataforma, conectamos famílias, terapeutas e educadores com ferramentas inovadoras que transformam o acompanhamento diário em uma jornada de evolução contínua, clareza e colaboração.</p>
                    </section>

                    <section className="sobre-section">
                        <h2>Como Funciona</h2>
                        <p>Para começar a utilizar a plataforma, você primeiro realiza um cadastro rápido em nosso site. Após concluir essa etapa, o acompanhamento do dia a dia acontece principalmente pelo aplicativo mobile, que foi desenvolvido para ser seu principal aliado na rotina de cuidados.

Através do celular, você poderá registrar facilmente observações importantes, comportamentos, evoluções e atividades da pessoa que você acompanha. A plataforma também facilita a comunicação com outros profissionais ou familiares envolvidos no cuidado, mantendo todos sincronizados com as mesmas informações. O objetivo é oferecer uma ferramenta prática que se adapte à sua rotina, permitindo um registro organizado e um acompanhamento mais eficiente, diretamente do seu smartphone..</p>
                    </section>
                </div>
            </main>

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

export default Sobre;
