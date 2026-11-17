const axios = require('axios');

exports.buscarReceitas = async (req, res) => {
    try {
        const nomeDaReceita = req.query.nome;
        const resposta = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
            params: {
                s: nomeDaReceita
            }
        });

        res.json(resposta.data);

    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar receitas' });
    }
};
exports.buscarPorId = async (req, res) => {
    try {
        const idDaReceita = req.params.id;
        const resposta = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php', {
            params: {
                i: idDaReceita
            }
        });

        res.json(resposta.data);

        } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar receitas' });
    }
}