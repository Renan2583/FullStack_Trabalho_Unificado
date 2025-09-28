import { Router } from 'express';
import { createUsuarioController } from '../controllers/usuario.controller.js';

const router = Router();
// Rota pública para criar um novo usuário
router.post('/', createUsuarioController);
export default router;