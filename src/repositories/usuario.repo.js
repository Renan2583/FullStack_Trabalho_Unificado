import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Cria um novo usuário com senha criptografada
export async function createUsuario({ nome, email, senha }) {
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [nome, email, senhaCriptografada]);
  return result.insertId;
}

// Busca um usuário pelo email (necessário para o login)
export async function findUsuarioByEmail(email) {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
}