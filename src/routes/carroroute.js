import { Router } from 'express';
import { getCarrosWithCliente } from '../controllers/carro.controller.js';
import { createCarroController } from '../controllers/carro.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/:id',protect,getCarrosWithCliente);
router.post('/',protect,createCarroController);

export default router;