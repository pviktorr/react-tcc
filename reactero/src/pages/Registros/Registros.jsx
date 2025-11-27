import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Navbar from '../../components/Navbar/Navbar';
import './Registros.css';

// Configuração da API
const API_BASE_URL = 'http://localhost:8080/v1/teajuda';
const ENDPOINTS = {
  LISTAR_REGISTROS: `${API_BASE_URL}/registro`,
  BUSCAR_REGISTRO: (id) => `${API_BASE_URL}/registro/${id}`,
  CRIAR_REGISTRO: `${API_BASE_URL}/registro`,
  ATUALIZAR_REGISTRO: (id) => `${API_BASE_URL}/registro/${id}`,
  EXCLUIR_REGISTRO: (id) => `${API_BASE_URL}/registro/${id}`,
};

const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [busca, setBusca] = useState('');
  const [registroEditando, setRegistroEditando] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    observacoes: '',
    alimentacao: '',
    sono: '',
    comportamento: '',
    medicamentos: '',
  });

  // Carregar registros
  const carregarRegistros = async () => {
    try {
      setCarregando(true);
      setErro(''); // Limpa erros anteriores
      
      const url = ENDPOINTS.LISTAR_REGISTROS;
      console.log('URL da requisição GET:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Status da resposta:', response.status, response.statusText);
      
      // Verifica se a resposta tem conteúdo antes de tentar fazer parse
      let responseData = { registros: [] };
      try {
        const responseText = await response.text();
        console.log('Resposta bruta:', responseText);
        responseData = responseText ? JSON.parse(responseText) : { registros: [] };
      } catch (e) {
        console.error('Erro ao fazer parse da resposta:', e);
        // Se não conseguir fazer o parse, trata como lista vazia
        setRegistros([]);
        return;
      }
      
      if (!response.ok) {
        // Se a resposta não for bem-sucedida, mas tiver status 404 (não encontrado),
        // considera como lista vazia em vez de erro
        if (response.status === 404) {
          console.log('Nenhum registro encontrado (404)');
          setRegistros([]);
          return;
        }
        
        console.error('Erro na resposta da API:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        throw new Error(responseData.message || `Erro ${response.status}: ${response.statusText}`);
      }
      
      console.log('Dados recebidos da API:', responseData);
      
      // A API pode retornar os registros em responseData.registros ou diretamente no responseData
      let registrosBrutos = [];
      
      if (Array.isArray(responseData.registros)) {
        // Formato quando há múltiplos registros (listagem)
        registrosBrutos = responseData.registros;
      } else if (responseData.registros && !Array.isArray(responseData.registros)) {
        // Formato quando há um único registro (criação/atualização)
        registrosBrutos = [responseData.registros];
      } else if (Array.isArray(responseData)) {
        // Formato quando a resposta é um array direto
        registrosBrutos = responseData;
      } else if (responseData.id) {
        // Formato quando a resposta é um único registro
        registrosBrutos = [responseData];
      }
      
      console.log('Registros brutos da API:', registrosBrutos);
      
      // Mapeia os registros para garantir que tenham a estrutura esperada
      const registrosFormatados = registrosBrutos.map((registro, index) => {
        console.log(`\n=== Processando registro ${index} ===`);
        console.log('Registro bruto:', JSON.stringify(registro, null, 2));
        
        // Debug: Verificar a data recebida da API
        console.log('Data recebida da API:', registro.data);
        console.log('Texto do registro:', registro.texto);
        
        // Extrai os dados do texto se necessário
        let titulo = registro.titulo || 'Sem título';
        let descricao = registro.descricao || '';
        
        console.log('Título extraído inicialmente:', titulo);
        console.log('Descrição extraída inicialmente:', descricao);
        
        // Se não tiver título ou descrição, tenta extrair do campo 'texto'
        if (registro.texto) {
          console.log('Texto disponível, tentando extrair informações...');
          const linhas = registro.texto.split('\n').map(l => l.trim()).filter(l => l);
          console.log('Linhas do texto:', linhas);
          
          // Tenta extrair o título (primeira linha relevante)
          if (!titulo || titulo === 'Sem título') {
            console.log('Tentando extrair título do texto...');
            // Tenta encontrar um padrão como "Título: Meu Título"
            const tituloMatch = registro.texto.match(/Título:\s*([^\n]+)/i);
            if (tituloMatch) {
              titulo = tituloMatch[1].trim();
              console.log('Título extraído do padrão "Título:":', titulo);
            } else if (linhas.length > 0) {
              // Se não encontrar o padrão, usa a primeira linha não vazia
              titulo = linhas[0].trim();
              console.log('Usando primeira linha como título:', titulo);
            }
          }
          
          // Tenta extrair a descrição (parte após "Descrição:")
          if (!descricao) {
            const descricaoIndex = linhas.findIndex(l => l.toLowerCase().startsWith('descrição:') || l.toLowerCase().startsWith('descricao:'));
            if (descricaoIndex !== -1 && linhas[descricaoIndex + 1]) {
              descricao = linhas[descricaoIndex + 1].trim();
            } else if (linhas.length > 1) {
              // Se não encontrar o marcador, usa a segunda linha como descrição
              descricao = linhas[1].trim();
            }
          }
        }
        
        return {
          id: registro.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
          titulo,
          descricao,
          data: registro.data || '', // Removido o valor padrão
          humor: registro.humor || 'neutro',
          alimentacao: registro.alimentacao || '',
          sono: registro.sono || '',
          comportamento: registro.comportamento || '',
          medicamentos: registro.medicamentos || '',
          observacoes: registro.observacoes || '',
          ...registro // Mantém todos os outros campos que possam existir
        };
      });
      
      console.log('Registros formatados:', registrosFormatados);
      setRegistros(registrosFormatados);
      
    } catch (erro) {
      console.error('Erro ao carregar registros:', erro);
      // Se for um erro de rede, mostra mensagem específica
      if (erro.message.includes('Failed to fetch')) {
        setErro('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        // Para outros erros, mostra mensagem genérica
        setErro('Não foi possível carregar os registros. Tente novamente mais tarde.');
      }
      setRegistros([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = registroEditando 
        ? ENDPOINTS.ATUALIZAR_REGISTRO(registroEditando.id)
        : ENDPOINTS.CRIAR_REGISTRO;
      
      const method = registroEditando ? 'PUT' : 'POST';
      
      // Validar campos obrigatórios
      if (!formData.titulo || formData.titulo.trim().length < 3) {
        throw new Error('O título é obrigatório e deve ter pelo menos 3 caracteres');
      }
      
      if (!formData.descricao || formData.descricao.trim().length < 10) {
        throw new Error('A descrição é obrigatória e deve ter pelo menos 10 caracteres');
      }
      
      // A data é inserida automaticamente pela API
      const dataAtual = new Date().toISOString().split('T')[0];
      
      // ID do usuário logado
      const usuarioId = 2;
      
      // Construir o texto com todas as informações
      const textoRegistro = `
        Título: ${formData.titulo.trim()}
        
        Descrição:
        ${formData.descricao.trim()}
        
        Alimentação: ${formData.alimentacao?.trim() || 'Não informado'}
        Sono: ${formData.sono?.trim() || 'Não informado'}
        Comportamento: ${formData.comportamento?.trim() || 'Não informado'}
        Medicamentos: ${formData.medicamentos?.trim() || 'Nenhum'}
        
        Observações adicionais:
        ${formData.observacoes?.trim() || 'Nenhuma observação'}
      `;
      
      // Preparar os dados no formato que a API espera
      const dadosParaEnviar = {
        texto: textoRegistro.replace(/^\s+/gm, ''), // Remove espaços em branco no início das linhas
        data: dataAtual, // A data é inserida automaticamente
        usuario_id: usuarioId
      };
      
      // Se estiver editando, adiciona o ID do registro
      if (registroEditando && registroEditando.id) {
        dadosParaEnviar.id = registroEditando.id;
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao salvar o registro');
      }
      
      // Limpar formulário
      setFormData({
        titulo: '',
        descricao: '',
        observacoes: '',
        alimentacao: '',
        sono: '',
        comportamento: '',
        medicamentos: '',
      });
      
      setRegistroEditando(null);
      carregarRegistros();
      
      // Mostrar mensagem de sucesso
      if (registroEditando) {
        alert('Registro atualizado com sucesso!');
      } else {
        alert('Registro salvo com sucesso!');
      }
    } catch (erro) {
      alert(erro.message || 'Erro ao salvar o registro. Tente novamente.');
    }
  };

  const extrairCampoDoTexto = (texto, campo) => {
    if (!texto) return '';
    const regex = new RegExp(`${campo}:\s*([^\n]+)`, 'i');
    const match = texto.match(regex);
    if (match && match[1]) {
      // Remove o valor padrão se existir (ex: "Não informado")
      return match[1].replace(/\s*\(não informado\)/i, '').trim();
    }
    return '';
  };

  const extrairDescricao = (texto) => {
    if (!texto) return '';
    const match = texto.match(/Descrição:[\s\n]+([\s\S]+?)(?:\n\n|$)/i);
    return match ? match[1].trim() : '';
  };

  const extrairObservacoes = (texto) => {
    if (!texto) return '';
    const match = texto.match(/Observações adicionais:[\s\n]+([\s\S]+)$/i);
    return match ? match[1].replace(/^Nenhuma observação$/, '').trim() : '';
  };

  const handleEditar = (registro) => {
    console.log('=== REGISTRO PARA EDIÇÃO ===');
    console.log('Registro completo:', registro);
    
    // Formata a data para o formato yyyy-MM-dd esperado pelo input date
    let dataFormatada = '';
    if (registro.data) {
      try {
        // Tenta converter a data do formato brasileiro para o formato ISO
        if (registro.data.includes('/')) {
          const [dataParte, horaParte] = registro.data.split(', ');
          const [dia, mes, ano] = dataParte.split('/').map(Number);
          const dataObj = new Date(ano, mes - 1, dia);
          dataFormatada = dataObj.toISOString().split('T')[0];
        } else {
          // Se já estiver em formato ISO, usa diretamente
          dataFormatada = registro.data.split('T')[0];
        }
        console.log('Data formatada para edição:', dataFormatada);
      } catch (e) {
        console.error('Erro ao formatar data para edição:', e);
        // Usa a data atual como fallback
        dataFormatada = new Date().toISOString().split('T')[0];
      }
    } else {
      // Se não houver data, usa a data atual
      dataFormatada = new Date().toISOString().split('T')[0];
    }

    // Extrair campos do texto se necessário
    let camposExtraidos = {};
    if (registro.texto) {
      console.log('Extraindo campos do texto...');
      camposExtraidos = {
        titulo: extrairCampoDoTexto(registro.texto, 'Título') || registro.titulo || '',
        descricao: extrairDescricao(registro.texto) || registro.descricao || '',
        alimentacao: extrairCampoDoTexto(registro.texto, 'Alimentação') || registro.alimentacao || '',
        sono: extrairCampoDoTexto(registro.texto, 'Sono') || registro.sono || '',
        comportamento: extrairCampoDoTexto(registro.texto, 'Comportamento') || registro.comportamento || '',
        medicamentos: extrairCampoDoTexto(registro.texto, 'Medicamentos') || registro.medicamentos || '',
        observacoes: extrairObservacoes(registro.texto) || registro.observacoes || '',
      };
      console.log('Campos extraídos:', camposExtraidos);
    }

    console.log('Preenchendo formulário com os dados extraídos...');
    
    setRegistroEditando(registro);
    setFormData({
      titulo: camposExtraidos.titulo || registro.titulo || '',
      descricao: camposExtraidos.descricao || registro.descricao || '',
      observacoes: camposExtraidos.observacoes || registro.observacoes || '',
      alimentacao: camposExtraidos.alimentacao || registro.alimentacao || '',
      sono: camposExtraidos.sono || registro.sono || '',
      comportamento: camposExtraidos.comportamento || registro.comportamento || '',
      medicamentos: camposExtraidos.medicamentos || registro.medicamentos || '',
    });
    
    console.log('Formulário preenchido:', {
      titulo: camposExtraidos.titulo || registro.titulo || '',
      descricao: camposExtraidos.descricao || registro.descricao || '',
      observacoes: camposExtraidos.observacoes || registro.observacoes || '',
      alimentacao: camposExtraidos.alimentacao || registro.alimentacao || '',
      sono: camposExtraidos.sono || registro.sono || '',
      comportamento: camposExtraidos.comportamento || registro.comportamento || '',
      medicamentos: camposExtraidos.medicamentos || registro.medicamentos || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExcluir = async (id) => {
    // Verifica se o ID é válido
    if (!id) {
      console.error('ID inválido para exclusão:', id);
      alert('Erro: ID do registro inválido');
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir este registro?')) {
      return;
    }
    
    try {
      const url = ENDPOINTS.EXCLUIR_REGISTRO(id);
      console.log('URL de exclusão:', url);
      
      const response = await fetch(url, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          // Adicione o token de autenticação se necessário
          // 'Authorization': `Bearer ${seuTokenAqui}`
        }
      });
      
      console.log('Status da resposta de exclusão:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro na resposta da API ao excluir:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(errorData.message || 'Erro ao excluir o registro');
      }
      
      // Atualizar lista local após exclusão
      setRegistros(registrosAtuais => registrosAtuais.filter(reg => reg.id !== id));
      alert('Registro excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir registro:', erro);
      alert(`Erro ao excluir o registro: ${erro.message}`);
    }
  };

  // Função para formatar data com tratamento de erro
  const formatarData = (dataString) => {
    if (!dataString) return 'Data não informada';
    
    try {
      // Verifica se a data já está no formato brasileiro (com barra)
      if (dataString.includes('/')) {
        // Extrai dia, mês, ano, hora, minuto, segundo
        const [dataParte, horaParte] = dataString.split(', ');
        const [dia, mes, ano] = dataParte.split('/').map(Number);
        const [hora, minuto, segundo] = horaParte ? horaParte.split(':').map(Number) : [0, 0, 0];
        
        // Cria uma nova data com os componentes extraídos
        const data = new Date(ano, mes - 1, dia, hora, minuto, segundo);
        return format(data, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
      }
      
      // Tenta formatar como ISO se não for formato brasileiro
      return format(parseISO(dataString), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    } catch (e) {
      console.error('Erro ao formatar data:', dataString, e);
      return dataString; // Retorna o valor original se não conseguir formatar
    }
  };

  // Filtrar registros por data e busca
  const registrosFiltrados = (registros || []).filter(registro => {
    if (!registro) return false; // Ignora registros inválidos
    
    // Converte a busca para minúsculas uma única vez
    const buscaLower = busca ? busca.toLowerCase() : '';
    const filtroDataLower = filtroData ? filtroData.toLowerCase() : '';
    
    // Verifica se o registro atende ao filtro de data
    const atendeFiltroData = !filtroData || 
      (registro.data && registro.data.toLowerCase().includes(filtroDataLower));
    
    // Se não houver busca, retorna apenas o filtro de data
    if (!busca) return atendeFiltroData;
    
    // Verifica se o registro atende à busca (no título, descrição ou texto)
    const textoBusca = (
      (registro.titulo || '') + ' ' + 
      (registro.descricao || '') + ' ' + 
      (registro.texto || '')
    ).toLowerCase();
    
    const atendeBusca = textoBusca.includes(buscaLower);
      
    return atendeFiltroData && atendeBusca;
  });

  return (
    <div className="registros-container">
      <Navbar />
      <main className="registros-main">
        <h1>Registros Diários</h1>
        
        {/* Formulário de Registro */}
        <form onSubmit={handleSubmit} className="form-registro">
          <h2>{registroEditando ? 'Editar Registro' : 'Novo Registro'}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Título do registro"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Alimentação</label>
              <input
                type="text"
                name="alimentacao"
                value={formData.alimentacao}
                onChange={handleInputChange}
                placeholder="Como foi a alimentação?"
              />
            </div>
            
            <div className="form-group">
              <label>Sono</label>
              <input
                type="text"
                name="sono"
                value={formData.sono}
                onChange={handleInputChange}
                placeholder="Como foi o sono?"
              />
            </div>
            
            <div className="form-group">
              <label>Comportamento</label>
              <input
                type="text"
                name="comportamento"
                value={formData.comportamento}
                onChange={handleInputChange}
                placeholder="Comportamento observado"
              />
            </div>
            
            <div className="form-group">
              <label>Medicamentos</label>
              <input
                type="text"
                name="medicamentos"
                value={formData.medicamentos}
                onChange={handleInputChange}
                placeholder="Medicamentos administrados"
              />
            </div>
            
            <div className="form-group full-width">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descreva como foi o dia..."
                rows="4"
                required
              />
            </div>
            
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Observações adicionais..."
                rows="3"
              />
            </div>
          </div>
          
          <div className="form-actions">
            {registroEditando && (
              <button 
                type="button" 
                className="btn-cancelar"
                onClick={() => {
                  setRegistroEditando(null);
                  setFormData({
                    titulo: '',
                    descricao: '',
                    observacoes: '',
                    alimentacao: '',
                    sono: '',
                    comportamento: '',
                    medicamentos: '',
                  });
                }}
              >
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-salvar">
              {registroEditando ? 'Atualizar' : 'Salvar'} Registro
            </button>
          </div>
        </form>
        
        {/* Filtros e Busca */}
        <div className="filtros">
          <div className="filtro-data">
            <label>Filtrar por data:</label>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
            />
            {filtroData && (
              <button 
                className="btn-limpar"
                onClick={() => setFiltroData('')}
              >
                Limpar
              </button>
            )}
          </div>
          
          <div className="busca">
            <input
              type="text"
              placeholder="Buscar em registros..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
        
        {/* Lista de Registros */}
        <div className="lista-registros">
          {carregando ? (
            <div key="carregando" className="carregando">
              <div className="spinner"></div>
              <p>Carregando registros...</p>
            </div>
          ) : erro ? (
            <div key="erro" className="erro">
              <p>{erro}</p>
              <button 
                className="btn-tentar-novamente"
                onClick={carregarRegistros}
              >
                Tentar novamente
              </button>
            </div>
          ) : registrosFiltrados.length === 0 ? (
            <div key="sem-registros" className="sem-registros">
              <div className="icone-sem-registros">
                <span role="img" aria-label="nenhum registro">📭</span>
              </div>
              <h3>Nenhum registro encontrado</h3>
              <p>
                {filtroData || busca 
                  ? 'Tente ajustar os filtros de busca ou data.'
                  : 'Parece que você ainda não tem nenhum registro. Que tal começar agora?'}
              </p>
              {!filtroData && !busca && (
                <button 
                  className="btn-adicionar-registro"
                  onClick={() => {
                    // Rola a página até o formulário
                    document.querySelector('.formulario-registro')?.scrollIntoView({ behavior: 'smooth' });
                    // Foca no campo de título
                    document.querySelector('input[name="titulo"]')?.focus();
                  }}
                >
                  Criar meu primeiro registro
                </button>
              )}
            </div>
          ) : (
            registrosFiltrados.map((registro) => (
              <div key={registro.id} className="card-registro">
                <div className="cabecalho-registro">
                  <div>
                    <h3>{registro.titulo || 'Sem título'}</h3>
                    <span className="data">
                      {registro.data ? formatarData(registro.data) : 'Data não informada'}
                    </span>
                  </div>
                  <div className="acoes">
                    <button 
                      className="btn-editar"
                      onClick={() => handleEditar(registro)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-excluir"
                      onClick={() => {
                        console.log('=== DETALHES DO REGISTRO ===');
                        console.log('Registro completo:', registro);
                        console.log('Todas as chaves do registro:', Object.keys(registro));
                        console.log('ID do registro (registro.id):', registro.id);
                        console.log('Possíveis IDs alternativos:');
                        console.log('- registro._id:', registro._id);
                        console.log('- registro.id_registro:', registro.id_registro);
                        console.log('- registro.codigo:', registro.codigo);
                        console.log('======================');
                        
                        // Tenta encontrar o ID em diferentes campos comuns
                        const idParaExcluir = registro.id || 
                                            registro._id || 
                                            registro.id_registro || 
                                            registro.codigo;
                                            
                        console.log('ID que será usado para exclusão:', idParaExcluir);
                        handleExcluir(idParaExcluir);
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                
                <div className="detalhes">
                  <div className="info">
                    {registro.alimentacao && (
                      <div key="alimentacao" className="info-item">
                        <span className="rotulo">Alimentação:</span>
                        <span>{registro.alimentacao}</span>
                      </div>
                    )}
                    
                    {registro.sono && (
                      <div key="sono" className="info-item">
                        <span className="rotulo">Sono:</span>
                        <span>{registro.sono}</span>
                      </div>
                    )}
                    
                    {registro.comportamento && (
                      <div key="comportamento" className="info-item">
                        <span className="rotulo">Comportamento:</span>
                        <span>{registro.comportamento}</span>
                      </div>
                    )}
                    
                    {registro.medicamentos && (
                      <div key="medicamentos" className="info-item">
                        <span className="rotulo">Medicamentos:</span>
                        <span>{registro.medicamentos}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="descricao">
                    <p>{registro.descricao}</p>
                    {registro.observacoes && (
                      <div key="observacoes" className="observacoes">
                        <strong>Observações:</strong>
                        <p>{registro.observacoes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rodape-registro">
                  <span>Registrado por: {registro.criadoPor || 'Cuidador'}</span>
                  <span>Atualizado em: {registro.atualizadoEm ? formatarData(registro.atualizadoEm) : 'Data não disponível'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Registros;
