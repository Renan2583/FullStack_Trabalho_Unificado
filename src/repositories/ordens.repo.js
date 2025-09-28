import pool from '../config/db.js';

/**
 * Cria uma nova Ordem de Serviço.
 */
export async function createOrdemServico(ordemData) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Calcula o valor total (isso não muda)
    const idsDosServicos = ordemData.servicos.map(s => s.servicoId);
    const [servicosDoBanco] = await connection.query('SELECT id, preco FROM servicos WHERE id IN (?)', [idsDosServicos]);

    if (servicosDoBanco.length !== idsDosServicos.length) {
      throw new Error("Um ou mais IDs de serviço são inválidos.");
    }
    
    const precosMap = new Map(servicosDoBanco.map(s => [s.id, parseFloat(s.preco)]));
    const valorTotal = ordemData.servicos.reduce((total, s) => {
        const precoUnitario = precosMap.get(s.servicoId);
        return total + (precoUnitario * s.quantidade);
    }, 0);

    // 2. Insere na tabela 'ordens_servico' usando EXATAMENTE suas colunas
    const sqlOrdem = `
      INSERT INTO ordens_servico (carro_id, data_abertura, descricao, valor_total)
      VALUES (?, ?, ?, ?)
    `;
    const [resultOrdem] = await connection.query(sqlOrdem, [
      ordemData.carroId,       // Salva na sua coluna `carro_id`
      ordemData.dataAbertura,  // Salva na sua coluna `data_abertura`
      ordemData.observacoes,   // O campo 'observacoes' do JSON é salvo na sua coluna `descricao`
      valorTotal               // O total calculado é salvo na sua coluna `valor_total`
    ]);
    const novaOrdemId = resultOrdem.insertId;

    // 3. Insere os itens na tabela de ligação (isso não muda)
    const itensDaOrdem = ordemData.servicos.map(s => [novaOrdemId, s.servicoId, s.quantidade]);
    const sqlItens = 'INSERT INTO ordem_servico_servicos (ordem_id, servico_id, quantidade) VALUES ?';
    await connection.query(sqlItens, [itensDaOrdem]);

    await connection.commit();
    return novaOrdemId;
  } catch (error) {
    await connection.rollback();
    throw error; 
  } finally {
    connection.release();
  }
}

/**
 * Busca uma Ordem de Serviço por ID.
 */
export async function findOrdemServicoById(id) {
    // A query foi ajustada para buscar também o ano do carro
    const [rows] = await pool.query(`
      SELECT
          os.id, os.descricao, os.valor_total, os.data_abertura,
          ca.id AS carro_id, ca.modelo AS carro_modelo, ca.placa AS carro_placa, ca.ano AS carro_ano, -- <-- MUDANÇA: Adicionado "ca.ano"
          cl.id AS cliente_id, cl.nome AS cliente_nome,
          s.id AS servico_id, s.descricao AS servico_descricao, s.preco AS servico_preco_unitario,
          oss.quantidade AS servico_quantidade
      FROM ordens_servico os
      LEFT JOIN carros ca ON os.carro_id = ca.id
      LEFT JOIN clientes cl ON ca.cliente_id = cl.id
      LEFT JOIN ordem_servico_servicos oss ON os.id = oss.ordem_id
      LEFT JOIN servicos s ON oss.servico_id = s.id
      WHERE os.id = ?
    `, [id]);
  
    if (rows.length === 0) {
      return null;
    }
  
    // A montagem do objeto foi totalmente ajustada para o novo formato
    const ordem = {
      id: rows[0].id,
      dataAbertura: rows[0].data_abertura, // <-- MUDANÇA: 'data_abertura' para 'dataAbertura' (camelCase)
      dataFechamento: null,                // <-- MUDANÇA: Novo campo adicionado com valor fixo null
      observacoes: rows[0].descricao,      // <-- MUDANÇA: 'descricao' renomeado para 'observacoes'
      carro: {
          id: rows[0].carro_id,
          modelo: rows[0].carro_modelo,
          placa: rows[0].carro_placa,
          ano: rows[0].carro_ano, // <-- MUDANÇA: Novo campo 'ano' adicionado
          cliente: {
              id: rows[0].cliente_id,
              nome: rows[0].cliente_nome
          }
      }
      // O campo 'valor_total' foi removido, como pedido.
    };
  
    if (rows[0].servico_id === null) {
      ordem.servicos = [];
    } else {
      // O .map() foi ajustado para o novo formato dos serviços
      ordem.servicos = rows.map(row => ({
        id: row.servico_id,
        descricao: row.servico_descricao,
        preco: row.servico_preco_unitario, // <-- MUDANÇA: 'preco_unitario' renomeado para 'preco'
        quantidade: row.servico_quantidade
      }));
    }
  
    return ordem;
  }