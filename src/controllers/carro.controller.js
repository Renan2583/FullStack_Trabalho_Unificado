import { findCarrosWithCliente } from '../repositories/carros.repo.js';
import { createCarro } from '../repositories/carros.repo.js';


export async function createCarroController(req,res){
    const carro = req.body;
    const result = await createCarro(carro);
    res.status(201).json({id:result});
}

export async function getCarrosWithCliente(req,res){
    const {id} = req.params;
    const result = await findCarrosWithCliente(id);
    res.json(result);
}