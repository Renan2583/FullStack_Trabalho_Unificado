import { Router } from 'express';
import { getClientes } from '../controllers/cliente.controller.js';
import { getClienteWithCarros } from '../controllers/cliente.controller.js';
import { createClienteController } from '../controllers/cliente.controller.js';

const router = Router();
router.get('/',getClientes);
router.get('/:id',getClienteWithCarros);
router.post('/',createClienteController);

export default router;