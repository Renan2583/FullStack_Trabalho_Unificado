import { createUsuario } from '../repositories/usuario.repo.js';

export async function createUsuarioController(req, res) {
  try {
    const novoUsuarioId = await createUsuario(req.body);
    res.status(201).json({ id: novoUsuarioId, message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno ao criar usuário." });
  }
}