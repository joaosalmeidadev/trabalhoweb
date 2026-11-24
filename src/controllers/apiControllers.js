const db = require('../config/db');

// GET /api/receitas -> Lista todas as receitas com seus ingredientes
exports.buscarReceitas = async (req, res) => {
    try {
        const [receitas] = await db.query('SELECT * FROM receitas');
        const [ingredientes] = await db.query('SELECT * FROM ingredientes');

        const resultado = receitas.map(receita => ({
            ...receita,
            ingredientes: ingredientes
                .filter(item => item.id_receita === receita.id)
                .map(item => item.ingrediente)
        }));

        res.json(resultado);
    } catch (erro) {
        console.error('Erro ao buscar receitas:', erro);
        res.status(500).json({ erro: 'Erro ao buscar receitas no banco de dados' });
    }
};

// GET /api/receitas/:id -> Busca uma receita específica pelo ID
exports.buscarPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [receitas] = await db.query('SELECT * FROM receitas WHERE id = ?', [id]);

        if (receitas.length === 0) {
            return res.status(404).json({ erro: 'Receita não encontrada' });
        }

        const [ingredientes] = await db.query(
            'SELECT ingrediente FROM ingredientes WHERE id_receita = ?',
            [id]
        );

        const receitaCompleta = {
            ...receitas[0],
            ingredientes: ingredientes.map(item => item.ingrediente)
        };

        res.json(receitaCompleta);
    } catch (erro) {
        console.error('Erro ao buscar receita por ID:', erro);
        res.status(500).json({ erro: 'Erro ao buscar a receita' });
    }
};