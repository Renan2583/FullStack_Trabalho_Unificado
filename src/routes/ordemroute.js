import { Router } from 'express';
// NOMES CORRIGIDOS E ROTA GET ADICIONADA
import { createOrdemServicoController, getOrdemServicoController } from '../controllers/ordem.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/',protect, createOrdemServicoController);
router.get('/:id',protect, getOrdemServicoController);

export default router;