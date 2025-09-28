import { Router } from 'express';
import { loginController } from '../controllers/auth.controller.js';

const router = Router();
// Rota pública para fazer login
router.post('/login', loginController);
export default router;