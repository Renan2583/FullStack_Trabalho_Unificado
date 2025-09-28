import { login } from '../repositories/auth.repo.js';

export async function loginController(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await login({ email, senha });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}