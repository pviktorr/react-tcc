// Localidades.jsx
import { Link } from 'react-router-dom';
import './Localidades.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Localidades() {
  const lugaresTEA = [
    {
      nome: "Centro de Terapia ABC",
      tipo: "terapia",
      endereco: "Rua das Flores, 123",
      telefone: "(11) 9999-8888",
      lat: -23.5505,
      lng: -46.6333,
      descricao: "Atendimento com psicólogos e terapeutas especializados"
    },
    {
      nome: "Escola Inclusiva Alegria",
      tipo: "educacao", 
      endereco: "Av. Principal, 456",
      telefone: "(11) 7777-6666",
      lat: -23.5510,
      lng: -46.6340,
      descricao: "Escola com metodologia adaptada para crianças TEA"
    },
    {
      nome: "Clínica Bem Estar",
      tipo: "saude",
      endereco: "Praça da Paz, 789",
      telefone: "(11) 5555-4444",
      lat: -23.5498,
      lng: -46.6325,
      descricao: "Acompanhamento médico e terapias integrativas"
    }
  ];

  const centroMapa = [-23.5505, -46.6333];
  
  const emojis = {
    terapia: "🧠",
    educacao: "📚", 
    saude: "🏥",
    lazer: "🎪"
  };

  return (
    <div className="localidades-container">
      {/* Navbar */}
      <div className="nav">
        <div className="container">
          <Link to="/home" className="btn">Home</Link>
          <Link to="/perfil" className="btn">Perfil</Link>
          <Link to="/sobre" className="btn">Sobre</Link>
          <Link to="/localidade" className="btn">Localidades</Link>
        </div>
      </div>
      
      <div className="conteudo-principal">
        {/* LISTA DE LUGARES - Lado esquerdo */}
        <div className="lista-lateral">
          <div className="cabecalho-lista">
            <h2>📍 Locais Encontrados</h2>
            <div className="contador">{lugaresTEA.length} lugares</div>
          </div>
          
          <div className="lugares-scroll">
            {lugaresTEA.map((lugar, index) => (
              <div key={index} className={`cartao-lugar-lateral cor-${lugar.tipo}`}>
                <div className="cabecalho-cartao-lateral">
                  <span className="emoji-lugar">{emojis[lugar.tipo]}</span>
                  <div className="info-basica">
                    <h3>{lugar.nome}</h3>
                    <p className="endereco">📍 {lugar.endereco}</p>
                  </div>
                </div>
                <div className="detalhes-lugar">
                  <p className="telefone">📞 {lugar.telefone}</p>
                  <p className="descricao">{lugar.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* MAPA - Lado direito (MENOR) */}
        <div className="mapa-container">
          <MapContainer 
            center={centroMapa} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            className="mapa-estavel"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {lugaresTEA.map((lugar, index) => (
              <Marker key={index} position={[lugar.lat, lugar.lng]}>
                <Popup>
                  <div className="popup-tea">
                    <span className="emoji-popup">{emojis[lugar.tipo]}</span>
                    <h3>{lugar.nome}</h3>
                    <p><strong>📞:</strong> {lugar.telefone}</p>
                    <p><strong>📍:</strong> {lugar.endereco}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Localidades;