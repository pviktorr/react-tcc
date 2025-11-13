import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Navbar from '../../components/Navbar/Navbar';
import './Calendario.css';

export default function Calendario() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [eventos, setEventos] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    hora: '',
    tipo: 'Consulta',
    descricao: '',
  });

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const selecionarDia = (dia) => {
    if (dia) {
      const novaData = new Date(dataSelecionada);
      novaData.setDate(dia);
      setDataSelecionada(novaData);
    }
  };

  const abrirModalAdicionar = () => {
    setMostrarModal(true);
  };

  const salvarEvento = () => {
    if (!novoEvento.titulo.trim()) return;

    const data = format(dataSelecionada, 'yyyy-MM-dd');
    const novosEventos = { ...eventos };

    if (!novosEventos[data]) novosEventos[data] = [];
    novosEventos[data].push({ ...novoEvento });

    setEventos(novosEventos);
    setNovoEvento({ titulo: '', hora: '', tipo: 'Consulta', descricao: '' });
    setMostrarModal(false);
  };

  const removerEvento = (data, index) => {
    if (window.confirm('Tem certeza que deseja remover este evento?')) {
      const novosEventos = { ...eventos };
      novosEventos[data].splice(index, 1);
      
      // Se não houver mais eventos nessa data, remove a data do objeto
      if (novosEventos[data].length === 0) {
        delete novosEventos[data];
      }
      
      setEventos(novosEventos);
      setEventoSelecionado(null);
    }
  };

  const selecionarEvento = (evento, index) => {
    setEventoSelecionado({ evento, index });
  };

  const diasDoMes = () => {
    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const dias = [];
    for (let i = 0; i < primeiroDia; i++) dias.push(null);
    for (let i = 1; i <= ultimoDia; i++) dias.push(i);

    return dias;
  };

  const dataFormatada = format(dataSelecionada, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  const eventosDia = eventos[format(dataSelecionada, 'yyyy-MM-dd')] || [];

  return (
    <div className="calendario-container">
      <Navbar />
      <div className="container">
        <div className="calendario">
          <div className="cabecalho">
            <button onClick={() => setDataSelecionada(new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth() - 1, 1))}>{'<'}</button>
            <span>{format(dataSelecionada, 'MMMM yyyy', { locale: ptBR })}</span>
            <button onClick={() => setDataSelecionada(new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth() + 1, 1))}>{'>'}</button>
          </div>

          <div className="diasSemana">
            {diasSemana.map((dia) => (
              <div key={dia} className="diaSemana">{dia}</div>
            ))}
          </div>

          <div className="dias">
            {diasDoMes().map((dia, index) => (
              <div
                key={index}
                className={`dia ${dia === dataSelecionada.getDate() ? 'selecionado' : ''}`}
                onClick={() => selecionarDia(dia)}
              >
                {dia}
              </div>
            ))}
          </div>
        </div>

        <div className="eventos">
          <div className="cabecalho-evento">
          </div>

          <div className="botoes-flutuantes">
            <button className="btn-adicionar" onClick={abrirModalAdicionar}>
              <span className="icone">+</span>
              <span className="texto">Adicionar Evento</span>
            </button>
          </div>
          {eventosDia.length === 0 ? (
            <p>Nenhum evento agendado para este dia.</p>
          ) : (
            <ul>
              {eventosDia.map((e, i) => (
                <li 
                  key={i} 
                  className={eventoSelecionado?.index === i ? 'evento-selecionado' : ''}
                  onClick={() => selecionarEvento(e, i)}
                >
                  <div className="evento-conteudo">
                    <strong>{e.titulo}</strong> — {e.hora} ({e.tipo})<br />
                    <small>{e.descricao}</small>
                  </div>
                  {eventoSelecionado?.index === i && (
                    <button 
                      className="btn-remover"
                      onClick={(e) => {
                        e.stopPropagation();
                        removerEvento(format(dataSelecionada, 'yyyy-MM-dd'), i);
                      }}
                    >
                      Remover
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {mostrarModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Adicionar Evento</h2>

              <label>Título</label>
              <input
                type="text"
                value={novoEvento.titulo}
                onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                placeholder="Título do evento"
              />

              <div className="linha">
                <div>
                  <label>Data</label>
                  <input
                    type="date"
                    value={format(dataSelecionada, 'yyyy-MM-dd')}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div>
                  <label>Hora</label>
                  <input
                    type="time"
                    value={novoEvento.hora}
                    onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                  />
                </div>
              </div>

              <label>Tipo</label>
              <select
                value={novoEvento.tipo}
                onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
              >
                <option>Consulta</option>
                <option>Medicamento</option>
                <option>Compromisso</option>
                <option>Outro</option>
              </select>

              <label>Descrição</label>
              <textarea
                value={novoEvento.descricao}
                onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                placeholder="Detalhes do evento..."
              />

              <div className="botoes">
                <button className="salvar" onClick={salvarEvento}>Salvar</button>
                <button className="cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="botoes-flutuantes">
        <button className="btn-adicionar" onClick={abrirModalAdicionar}>
          <span className="icone">+</span>
          <span className="texto">Adicionar Evento</span>
        </button>
      </div>
    </div>
  );
}
