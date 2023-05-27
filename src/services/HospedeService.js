const connection = require('../connection');

class HospedeService { 
    async buscarTodos() {
        const [query] = await connection.execute('SELECT * FROM Places.hospede'); // [query] - Irá retornar mais que um registro
        return query;
    }

    async buscar(id) {
        const [query] = await connection.execute(`SELECT * FROM Places.hospede WHERE ${id} = id`) //  query - Somente um registro
        return query;
    }

    async inserir(nome, cpf, idade, email, senha) {
        const [query] = await connection.execute(`INSERT INTO Places.hospede VALUE (NULL, "${nome}", "${cpf}", ${idade}, "${email}", "${senha}")`);
        return query
    }

    async excluir(id) {
        const [query] = await connection.execute(`DELETE FROM Places.hospede WHERE ${id} = id`);
        return query;
    }

    async alterar(id,nome, cpf, idade, email, senha) {
        const [query] = await connection.execute(`UPDATE Places.hospede SET nome = "${nome}", cpf = "${cpf}", idade = ${idade}, email = "${email}", senha = "${senha}" WHERE ${id} = id`);
        return query
    }

    async buscarPorEmail(email) {
        const [query] = await connection.execute(`SELECT * FROM Places.hospede WHERE "${email}" = email`) //  query - Somente um registro
        return query;
    }
    
}

module.exports = { HospedeService }

// const getHospede = async (id) => {
//     const [query] = await connection.execute(`SELECT * FROM speeds.cliente WHERE ${id} = id_cliente`)
//     return query;
// }

// const postHospede = async (nome, cpf, email, telefone, data_de_nascimento, senha, endereco) => {
//     const [query] = await connection.execute(`INSERT INTO cliente VALUE (NULL, "${nome}", "${cpf}", "${email}", "${telefone}", "${data_de_nascimento}", "${senha}", "${endereco}")`);
//     return query;
// }

// const deleteHospede = async (id) => {
//     const [query] = await connection.execute(`DELETE FROM cliente WHERE ${id} = id_cliente`);
//     return query;
// }