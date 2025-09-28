import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUsuarioByEmail } from './usuario.repo.js';

export async function login({ email, senha }) {
  const usuario = await findUsuarioByEmail(email);
  if (!usuario) {
    throw new Error("Credenciais inválidas.");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Credenciais inválidas.");
  }

  const payload = { id: usuario.id, nome: usuario.nome };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  
  return token;
}