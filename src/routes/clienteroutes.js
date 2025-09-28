import { Router } from 'express';
import { getClientes } from '../controllers/cliente.controller.js';
import { getClienteWithCarros } from '../controllers/cliente.controller.js';
import { createClienteController } from '../controllers/cliente.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/',protect,getClientes);
router.get('/:id',protect,getClienteWithCarros);
router.post('/',protect,createClienteController);

export default router;