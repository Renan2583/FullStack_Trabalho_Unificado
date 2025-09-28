import pool from '../config/db.js';

export async function createCliente(cliente){
    const {nome,telefone,email} = cliente;
    const [result] = await pool.query
    (`INSERT INTO clientes (nome,telefone,email)
    VALUES (?,?,?)`,[nome,telefone,email]);
    return result.insertId;
}

export async function findAllClientes({page = 1, limit = 10}){ //TRAZ TODOS OS CLIENTES
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
        'SELECT id,nome,telefone,email from clientes order by id limit ? offset ?',
        [Number(limit), Number(offset)]
    );
    const [[{total}]] = await pool.query('SELECT COUNT(*) as total FROM clientes');

    return {data:rows,page:Number(page),limit:Number(limit),total};
}

export async function findClienteWithCarros(id) { //TRAZ OS CLIENTES POR ID
    const [rows] = await pool.query(`
      SELECT
        c.id, c.nome, c.telefone, c.email,
        ca.id as carro_id, ca.modelo, ca.placa, ca.ano
      FROM clientes c
      LEFT JOIN carros ca ON c.id = ca.cliente_id
      WHERE c.id = ?`,
      [id]
    );
  
    
    if (rows.length === 0) {
      return null; 
    }
  
   
    const cliente = {
      id: rows[0].id,
      nome: rows[0].nome,
      telefone: rows[0].telefone,
      email: rows[0].email,
    };
  
    
    if (rows[0].carro_id === null) {
      cliente.carros = []; 
    } else {
      
      cliente.carros = rows.map(row => ({
        id: row.carro_id,
        modelo: row.modelo,
        placa: row.placa,
        ano: row.ano
      }));
    }
  
    return cliente;
  }

    

    