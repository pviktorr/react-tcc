import React, { useState, useEffect } from 'react';
import './Relatorio.css';

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Carregar relatórios da API
  useEffect(() => {
    const carregarRelatorios = async () => {
      try {
        setCarregando(true);

        const response = await fetch('/api/relatorios');

        if (!response.ok) {
          throw new Error('Erro ao buscar relatórios');
        }

        const dados = await response.json();

        const relatoriosFormatados = dados.map((relatorio, index) => {
          const semana = relatorio.semana || relatorio.numero_semana || index + 1;

          return {
            id: relatorio.id || index,
            titulo: relatorio.titulo || relatorio.nome || `Relatório ${semana}`,
            semana,
            concluido:
              typeof relatorio.concluido === 'boolean'
                ? relatorio.concluido
                : typeof relatorio.finalizado === 'boolean'
                ? relatorio.finalizado
                : false,
            conteudo: relatorio.conteudo || relatorio.descricao || '',
            dataCriacao: relatorio.data_criacao || relatorio.created_at || null,
            resumo: relatorio.resumo || ''
          };
        });

        setRelatorios(relatoriosFormatados);

        // Selecionar o primeiro relatório por padrão
        if (relatoriosFormatados.length > 0) {
          setRelatorioSelecionado(relatoriosFormatados[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar relatórios:', error);
        setErro('Erro ao carregar relatórios. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    carregarRelatorios();
  }, []);

  const handleSelecionarRelatorio = (relatorio) => {
    setRelatorioSelecionado(relatorio);
  };

  const toggleConcluido = (relatorioId) => {
    // Atualizar localmente o status do relatório
    const relatoriosAtualizados = relatorios.map(relatorio =>
      relatorio.id === relatorioId
        ? { ...relatorio, concluido: !relatorio.concluido }
        : relatorio
    );
    
    setRelatorios(relatoriosAtualizados);
    
    // Se o relatório selecionado foi alterado, atualize também
    if (relatorioSelecionado && relatorioSelecionado.id === relatorioId) {
      setRelatorioSelecionado(prev => ({
        ...prev,
        concluido: !prev.concluido
      }));
    }
  };

  if (carregando) {
    return (
      <div className="carregando-container">
        <div className="carregando-spinner"></div>
        <p>Carregando relatórios...</p>
      </div>
    );
  }

  return (
    <div className="relatorios-container">
      <div className="relatorios-header">
        <h1>Relatórios</h1>
      </div>

      {erro && (
        <div className="erro-message">
          {erro}
        </div>
      )}

      <div className="relatorios-content">
        <div className="relatorios-lista">
          <h2>Relatórios</h2>
          <div className="lista-cards">
            {relatorios.map(relatorio => (
              <div
                key={relatorio.id}
                className={`relatorio-card ${relatorio.concluido ? 'concluido' : ''} ${
                  relatorioSelecionado && relatorioSelecionado.id === relatorio.id ? 'selecionado' : ''
                }`}
                onClick={() => handleSelecionarRelatorio(relatorio)}
              >
                <div className="card-header">
                  <span className="card-numero">
                    {relatorio.semana ? `Relatório ${relatorio.semana}` : `Relatório ${relatorio.id}`}
                  </span>
                  <input
                    type="checkbox"
                    checked={relatorio.concluido}
                    onChange={() => toggleConcluido(relatorio.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="checkbox"
                  />
                </div>
              </div>
            ))}
          </div>

          {relatorios.length === 0 && !carregando && (
            <div className="sem-relatorios">
              <p>Nenhum relatório encontrado.</p>
            </div>
          )}
        </div>

        <div className="relatorio-detalhes">
          {relatorioSelecionado ? (
            <>
              <h2>{relatorioSelecionado.titulo}</h2>

              <div className="detalhes-conteudo">
                {relatorioSelecionado.conteudo || (
                  <p className="sem-conteudo">
                    Nenhum conteúdo disponível para este relatório.
                  </p>
                )}
              </div>
              <div className="detalhes-status">
                <span className={`status ${relatorioSelecionado.concluido ? 'concluido' : 'pendente'}`}>
                  {relatorioSelecionado.concluido ? '✓ Concluído' : '⏳ Pendente'}
                </span>
              </div>
            </>
          ) : (
            <div className="nenhum-selecionado">
              <p>Selecione um relatório para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Relatorios;