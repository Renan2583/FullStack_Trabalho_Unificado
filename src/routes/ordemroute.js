import { Router } from 'express';
// NOMES CORRIGIDOS E ROTA GET ADICIONADA
import { createOrdemServicoController, getOrdemServicoController } from '../controllers/ordem.controller.js';


const router = Router();

router.post('/', createOrdemServicoController);
router.get('/:id', getOrdemServicoController);

export default router;