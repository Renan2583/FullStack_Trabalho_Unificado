
CADASTRAR CLIENTE.

POST http://localhost:3000/clientes 
ex:

{
    "nome" : "Messi",
    "email" : "messi@hotmail.com",
    "telefone" : "6798983222"
}
--------------------------------------------

LISTAR TODOS OS CLIENTES
GET HTPP://LOCALHOST:3000/CLIENTES
--------------------------------------------

LISTAR CLIENTES E OS CARROS POR ID

GET http://localhost:3000/id do cliente
ex:
OBS : AQUI ESTÁ TRAZENDO O CLIENTE E O CARRO.
{
    "id": 1,
    "nome": "RENAN",
    "telefone": "18997014612",
    "email": "renanvcoimbra@hotmail.com",
    "carros": [
        {
            "id": 1,
            "modelo": "ford new fiesta",
            "placa": "fhg350",
            "ano": 2010
        }
    ]
}
------------------------------------------------
CADASTRAR CARRO
POST HTTP://LOCALHOST:3000/CARROS
ex:

{
    "cliente_id" : "4",
    "modelo" : "Chevrolet Onix",
    "placa" : "dtt2402",
    "ano" : "2017"
}
-----------------------------------------------
LISTAR CARROS E SEU DONO
GET HTTP://LOCALHOST:3000/CARROS/ID DO CARRO

ex:
{
    "id": 4,
    "modelo": "Chevrolet Onix",
    "placa": "dtt2402",
    "ano": 2017,
    "cliente": {
        "nome": "Messi"
}
----------------------------------------------
LISTAR SERVIÇOS
GET HTTP://LOCALHOST:3000/SERVICOS
ex:
{
    "data": [
        {
            "id": 1,
            "descricao": "troca de oleo",
            "preco": "500.00"
        }
}
-----------------------------------------------
CADASTRAR SERVICOS
POST HTTP://LOCALHOST:3000/SERVICOS
ex:
{
    "descricao": "trocar bateria",
    "preco" : "320"
}
------------------------------------------------
CRIAR ORDENS DE SERVIÇO
POST HTTP://LOCALHOST:3000/ORDENS
ex:
{
  "carroId": 4,
  "dataAbertura": "2025-12-25",
  "observacoes": "Troca de bateria ",
  "servicos": [
    { "servicoId": 4, "quantidade": 1 }
  ]
}
------------------------------------------------
LISTAR ORDENS DE SERVIÇO POR ID
GET HTTP:/LOCALHOST:3000/ORDENS/ID DA ORDEM
ex:

{
    "id": 2,
    "dataAbertura": "2025-12-25T03:00:00.000Z",
    "dataFechamento": null,
    "observacoes": "Troca de bateria ",
    "carro": {
        "id": 4,
        "modelo": "Chevrolet Onix",
        "placa": "dtt2402",
        "ano": 2017,
        "cliente": {
            "id": 4,
            "nome": "Messi"
        }
    },
    "servicos": [
        {
            "id": 4,
            "descricao": "trocar bateria",
            "preco": "320.00",
            "quantidade": 1
        }
    ]

}
-----------------------------------------------
