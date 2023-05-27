const connection = require('../connection');

class HospedagemService { 
    async buscarTodos() {
        const [query] = await connection.execute('SELECT * FROM Places.hospedagem'); // [query] - Irá retornar mais que um registro
        return query;
    }

    async buscar(id) {
        const [query] = await connection.execute(`SELECT * FROM Places.hospedagem WHERE ${id} = id`) //  query - Somente um registro
        return query;
    }

    async inserir(data_entrada, data_saida, num_pessoas, hospede_id, hotel_id, quarto_qua_num) {
        const [query] = await connection.execute(`INSERT INTO Places.hospedagem VALUE (NULL, "${data_entrada}", "${data_saida}", ${num_pessoas}, ${hospede_id}, ${hotel_id}, ${quarto_qua_num})`);
        return query
    }
      

    async excluir(id) {
        const [query] = await connection.execute(`DELETE FROM Places.hospedagem WHERE ${id} = id`);
        return query;
    }

    async alterar(id,data_entrada, data_saida, num_pessoas, hospede_id, hotel_id, quarto_qua_num) {
        const [query] = await connection.execute(`UPDATE Places.hospedagem SET data_entrada = "${data_entrada}", data_saida = "${data_saida}", num_pessoas = ${num_pessoas}, hospede_id = ${hospede_id}, hotel_id = ${hotel_id}, quarto_qua_num = ${quarto_qua_num} WHERE ${id} = id`);
        return query
    }
    
}

module.exports = { HospedagemService }
