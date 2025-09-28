import pool from '../config/db.js';

export async function createCarro(carro){
    const {cliente_id,modelo,placa,ano} = carro;
    const [result] = await pool.query
    (`INSERT INTO carros (cliente_id,modelo,placa,ano)
    VALUES (?,?,?,?)`,[cliente_id,modelo,placa,ano]);
    return result.insertId;
}

export async function findCarrosWithCliente(id){
    const [rows] = await pool.query(`SELECT
        c.id,
        c.modelo,
        c.placa,
        c.ano,
        cl.nome from carros c left
        join clientes cl on c.cliente_id = cl.id where c.id = ?`,[id]);

    if(rows.length === 0)return null;

    const carro = {
        id:rows[0].id,
        modelo:rows[0].modelo,
        placa:rows[0].placa,
        ano:rows[0].ano,
        cliente_id:rows[0].cliente_id
    }

    if(rows[0].cliente_id === null)carro.cliente = null;
    else carro.cliente = {
        id:rows[0].cliente_id,
        nome:rows[0].nome
    }

    return carro;
}