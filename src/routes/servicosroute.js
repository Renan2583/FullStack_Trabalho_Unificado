import { Router } from 'express';
import { getServicos } from '../controllers/servico.controller.js';
import { createServicoController } from '../controllers/servico.controller.js';

const router = Router();
router.get('/',getServicos);
router.post('/',createServicoController);

export default router;