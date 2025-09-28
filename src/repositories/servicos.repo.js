import pool from '../config/db.js';

export async function createServico(servico){
    const {descricao,preco} = servico;
    const [result] = await pool.query
    (`INSERT INTO servicos (descricao,preco)
    VALUES (?,?)`,[descricao,preco]);
    return result.insertId;
}

export async function findAllServicos({page = 1, limit = 10}){
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
        'SELECT id,descricao,preco from servicos order by id limit ? offset ?',
        [Number(limit), Number(offset)]
    );
    const [[{total}]] = await pool.query('SELECT COUNT(*) as total FROM servicos');

    return {data:rows,page:Number(page),limit:Number(limit),total};
}