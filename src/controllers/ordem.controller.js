// NOME IMPORTADO CORRIGIDO (e organizado)
import { createOrdemServico, findOrdemServicoById } from '../repositories/ordens.repo.js';


export async function createOrdemServicoController(req, res) {
  try {
    const dadosOrdem = req.body;

    if (!dadosOrdem.carroId || !dadosOrdem.servicos || dadosOrdem.servicos.length === 0) {
      return res.status(400).json({ message: "O carroId e a lista de serviços são obrigatórios." });
    }
    
    // Esta chamada agora funciona
    const novaOrdemId = await createOrdemServico(dadosOrdem);

    res.status(201).json({ id: novaOrdemId, message: "Ordem de serviço criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar ordem de serviço:", error);
    res.status(500).json({ message: error.message || "Erro interno no servidor." });
  }
}

export async function getOrdemServicoController(req, res) {
  try {
    const { id } = req.params;
    const ordem = await findOrdemServicoById(id);

    if (!ordem) {
      return res.status(404).json({ message: "Ordem de serviço não encontrada." });
    }

    res.json(ordem);
  } catch (error) {
    console.error("Erro ao buscar ordem de serviço:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}