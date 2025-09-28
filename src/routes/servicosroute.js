import { Router } from 'express';
import { getServicos } from '../controllers/servico.controller.js';
import { createServicoController } from '../controllers/servico.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/',protect,getServicos);
router.post('/',protect,createServicoController);

export default router;