// Localidades.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Localidades.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Localidades() {
  // Adicionando um estilo para o container principal para dar espaço para a navbar fixa
  const containerStyle = {
    paddingTop: '80px',  // Altura da navbar + um pouco de espaço
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  };
  const lugaresTEA = [
    {
      nome: "Sala Sensorial Estação Santa Cruz (Metrô/ViaMobilidade)",
    
      endereco: "Estação Santa Cruz (Linha 5-Lilás), Vila Mariana, São Paulo/SP",
      telefone: "(11) 3116-7406",
      lat:-23.52332,
      lng: -46.6385,
      descricao: "Atendimento com psicólogos e terapeutas especializados"
    },
    {
      nome: "Unidade de Referência em Autismo Prof. Marcos Tomanik Mercadante (AMA - Vila Mariana)",
    
      endereco: "Rua Capitão Cavalcanti, 268 – Vila Mariana, São Paulo/SP",
      telefone: "(11) 3466-2600",
      lat: -23.5878,
      lng: -46.6371,
      descricao: "Unidade que oferece atendimento e serviços especializados para pessoas com Transtorno do Espectro Autista (AMA)."
    },
    {
      nome: "TEAjudo SabiaMente",
      endereco: "Rua Cantagalo, 678. Tatuapé – São Paulo – SP. CEP 03319-000",
      telefone: "(11) 2096-4938 / (11) 99486-0408 (WhatsApp)",
      lat: -23.5459,
      lng: -46.5683,
      descricao: "Unidade especializada do Governo de SP com serviços e apoio para autistas, incluindo sala de interação multissensorial e espaço de acolhimento para crises."
    },
    {
      nome: "Centro TEA Paulista",
      endereco: "Rua Galileo Emendabili, 99, Jardim Humaitá – São Paulo/SP",
      telefone: "(11) 3116-7406",
      lat: -23.52332,
      lng: -46.74369,
      descricao: "Unidade especializada do Governo de SP com serviços e apoio para autistas, incluindo sala de interação multissensorial e espaço de acolhimento para crises."
    },
    {
      nome: "Sala Sensorial Estação Tatuapé (CPTM/Metrô)",
      endereco: "Estação Tatuapé (Linhas 11, 12 da CPTM e Linha 3-Vermelha do Metrô), Tatuapé, São Paulo/SP",
      telefone: "Não disponível publicamente para a Sala, mas a CPTM/Metrô possuem canais de contato.",
      lat: -23.5413,
      lng: -46.5779,
      descricao: "Espaço que oferece conforto visual e acústico para pessoas autistas e neurodivergentes em crises sensoriais ou com alta sensibilidade a estímulos externos."
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
    <div style={containerStyle}>
      <Navbar />
      <div className="localidades-container">
      
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
  </div>
  );
}

export default Localidades;