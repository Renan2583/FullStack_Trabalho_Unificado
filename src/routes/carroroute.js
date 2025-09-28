import { Router } from 'express';
import { getCarrosWithCliente } from '../controllers/carro.controller.js';
import { createCarroController } from '../controllers/carro.controller.js';

const router = Router();
router.get('/:id',getCarrosWithCliente);
router.post('/',createCarroController);

export default router;