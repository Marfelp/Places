const { HospedeService } = require('../services/HospedeService');
const jwt = require("jsonwebtoken")


// As controles são responsáveis por somente receber a requisição e enviar resposta para o front
class HospedeController { 
    async getTodos(request, response) {
        const hospedeService = new HospedeService(); // Instanciar = Criando o próprio objeto
        const hospedes = await hospedeService.buscarTodos();
        return response.status(200).json(hospedes);
    }


    async getHospede(request, response) {
        const id = request.params.id;
        const hospedeService = new HospedeService();
        const hospede = await hospedeService.buscar(id);

        if(hospede.length === 0) {
            return response.status(400).json("Hospede não existente");
        }

        return response.status(200).json(hospede);
    }

    async criar(request, response) {
        const { nome, cpf, idade, email, senha } = request.body;
        const hospedeService = new HospedeService(); 
        try {
            const resultado = await hospedeService.inserir( nome, cpf, idade, email, senha);
            console.log(resultado);
            return response.status(200).json("Hospede inserido com sucesso");
        } catch (error) {
            console.log(error)
            return response.status(500).json("Erro interno ao inserir usuário")
        }
    }

    async excluir(request, response) {
        const id = request.params.id;
        const hospedeService = new HospedeService();
        const resultado = await hospedeService.excluir(id);

        return response.status(200).json(`Hospede ${id} excluído com sucesso`);
    }

    async alterar(request, response) {
        const id = request.params.id;
        const { nome, cpf, idade, email, senha } = request.body;
        const hospedeService = new HospedeService();
        try {
            var hospede = await hospedeService.buscar(id);
            const resultado = await hospedeService.alterar(id,nome,cpf,idade,email,senha);
            console.log(resultado);
            return response.status(200).json("Hospede alterado com sucesso");
        } catch (error) {
            if(hospede.length === 0) {
                return response.status(400).json("Hospede não existente");
            }
            console.log(error)
            return response.status(500).json("Erro interno ao alterar usuário")
        }

    }

    async login(request, response) {
        const {email, senha} = request.body;
        const hospedeService = new HospedeService();
        console.log(email,senha);
        try { 
            const hospede = await hospedeService.buscarPorEmail(email);
            if(hospede.length === 0) {
                return response.status(400).json("Email/Senha incorreta");
            }
            if(senha !== hospede[0].senha) {  //hospede[0] - Vetor de objetos, sempre retorna somente um vetor
                return response.status(400).json("Email/Senha incorreta")
            }
            else { 
                const secret_key = "djasbdkasdasdhjavsdayu";
                const token = jwt.sign({email}, secret_key, {expiresIn: "3h"});
                return response.status(200).json("Bearer " + token);

            }


    
        } catch (error){ 
            console.log(error);
            return response.status(500).json("Erro ao fazer login");
        }
        

    }
}

module.exports = { HospedeController }

// app.get('/hospedes', async (request, response) => {
//     const hospedes = await todosHospedes();
//     return response.status(200).json(hospedes);
// });

// app.get('/hospede/:id',async (request, response) => {
//     const id = request.params.id;
//     const hospede = await getHospede(id);
//     return response.status(200).json(hospede);
// });

// app.post('/hospede/novo', async (request, response) => {
//     const{nome, cpf, email, telefone, data_de_nascimento, senha, endereco} = request.body;
//     const resultado = await postHospede(nome, cpf, email, telefone, data_de_nascimento, senha, endereco);
//     return response.status(200).json("Hospede inserido com sucesso");
// });

// app.delete('/hospede/:id', async (request, response) => {
//     const id = request.params.id;
//     const resultado = await deleteHospede(id);
//     return response.status(200).json(`Hospede ${id} excluído com sucesso`);
// });
