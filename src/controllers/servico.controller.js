import { findAllServicos } from '../repositories/servicos.repo.js';
import { createServico } from '../repositories/servicos.repo.js';

export async function createServicoController(req,res){
    const servico = req.body;
    const result = await createServico(servico);
    res.status(201).json({id:result});
}

export async function getServicos(req,res){
     const {page=1,limit=10} = req.query;
     const result = await findAllServicos({page,limit});
     res.json(result);
}