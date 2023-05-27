const jwt = require("jsonwebtoken");
const { HospedagemService } = require('../services/HospedagemService');
const { HospedeService }  = require('../services/HospedeService');


// As controles são responsáveis por somente receber a requisição e enviar resposta para o front
class HospedagemController { 
    async getTodos(request, response) {
        const hospedagemService = new HospedagemService();
        const hospedagens = await hospedagemService.buscarTodos();
        return response.status(200).json(hospedagens);
    }

    async getHospedagem(request, response) {
        const id = request.params.id;
        const hospedagemService = new HospedagemService();
        const hospedagem = await hospedagemService.buscar(id);

        if(hospedagem.length === 0) {
            return response.status(400).json("Hospedagem não existente");
        }

        return response.status(200).json(hospedagem);
    }


    async criar(request, response) {
        const { data_entrada, data_saida, num_pessoas,hotel_id,quarto_qua_num } = request.body; //recebendo no body
        const hospedagemService = new HospedagemService();
      
        try {
          // Extrair o token de autenticação do cabeçalho da requisição
          const token = request.headers.authorization;
      
          // Verificar e decodificar o token para obter as informações
          const decodedToken = jwt.verify(token.split(" ")[1], "djasbdkasdasdhjavsdayu"); // Substitua "chave_secreta" pela sua chave de autenticação
         
      
          // Verificar se o token é válido e decodificado com sucesso
          if (!decodedToken) {
            return response.status(401).json("Token inválido");
          }
      
          // Extrair o email do token decodificado
          const email = decodedToken.email;
          console.log(email);
          // Usar o email para associar a hospedagem ao hospede correspondente
          const hospedeService = new HospedeService();
          const hospede = await hospedeService.buscarPorEmail(email);
          console.log(hospede);
      
          // Verificar se o hospede existe
          if (hospede.length === 0) {
            return response.status(400).json("Hospede não encontrado");
          }
      
          // Associar a hospedagem ao hospede_id
          const hospede_id = hospede[0].id;
      
          // Chamar o método inserir do serviço HospedagemService
          const resultado = await hospedagemService.inserir(data_entrada, data_saida, num_pessoas, hospede_id, hotel_id,quarto_qua_num);
          console.log(resultado);
      
          return response.status(200).json("Hospedagem efetuada com sucesso");
        } catch (error) {
          console.log(error);
          return response.status(500).json("Erro ao efetuar a hospedagem");
        }
      }
      

    async excluir(request, response){
        const id = request.params.id;
        const hospedagemService = new HospedagemService();
        const resultado = await hospedagemService.excluir(id)
        console.log(resultado);

        return response.status(200).json(`Hospedagem ${id} excluído com sucesso`);
    }

    async alterar(request, response) {
      const id = request.params.id;
      const { data_entrada, data_saida, num_pessoas, hospede_id, hotel_id, quarto_qua_num } = request.body;
      const hospedagemService = new HospedagemService();
      try {
          var hospedagem = await hospedagemService.buscar(id);
          const resultado = await hospedagemService.alterar(id,data_entrada,data_saida,num_pessoas,hospede_id,hotel_id,quarto_qua_num);
          console.log(resultado); 
          return response.status(200).json("Hospedagem alterada com sucesso");
      } catch (error) {
          if(hospedagem.length === 0) {
              return response.status(400).json("Hospedagem não existente");
          }
          console.log(error)
          return response.status(500).json("Erro interno ao alterar usuário")
      }

  }
}

module.exports = { HospedagemController }

// app.get('/hospedagems', async (request, response) => {
//     const hospedagems = await todasHospedagems();
//     return response.status(200).json(hospedagems);
// });

// app.get('/hospedagem/:id', async(request, response) => {
//     const id = request.params.id;
//     const hospedagem = await getHospedagem(id);
//     return response.status(200).json(hospedagem);
// });

// app.post('/hospedagem/novo', async (request, response) => {
//     const{data_entrada, data_saida, num_pessoas} = request.body;
//     const resultado = await postHospedagem(data_entrada, data_saida, num_pessoas);
//     return response.status(200).json("Hospedagem inserida com sucesso");
// });

// app.delete('/hospedagem/:id', async (request, response) => {
//     const id = request.params.id;
//     const resultado = await deleteHospedagem(id);
//     return response.status(200).json(`A Hospedagem ${id} foi excluída com sucesso`);
// });
