import { findAllClientes } from '../repositories/clientes.repo.js';
import { findClienteWithCarros } from '../repositories/clientes.repo.js';
import { createCliente } from '../repositories/clientes.repo.js';

export async function createClienteController(req,res){
    const cliente = req.body;
    const result = await createCliente(cliente);
    res.status(201).json({id:result});
}


export async function getClientes(req,res){
     const {page=1,limit=10} = req.query;
     const result = await findAllClientes({page,limit});
     res.json(result);
}

export async function getClienteWithCarros(req,res){
    const {id} = req.params;
    const result = await findClienteWithCarros(id);
    res.json(result);
}

