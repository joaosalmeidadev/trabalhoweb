const db = require('../config/db');

buscarReceitas = async (req, res) => {
    const { nome, categoria, ingrediente, pais } = req.query;

    try {
        let sql = 'SELECT DISTINCT r.* FROM receitas r LEFT JOIN ingredientes i ON r.id = i.id_receita WHERE 1=1';
        const params = [];

        if (nome && nome.trim() !== '') {
            sql += ' AND r.nome LIKE ?';
            params.push(`%${nome.trim()}%`);
        }
        if (categoria && categoria.trim() !== '') {
            sql += ' AND r.categoria LIKE ?';
            params.push(`%${categoria.trim()}%`);
        }
        if (pais && pais.trim() !== '') {
            sql += ' AND r.pais LIKE ?';
            params.push(`%${pais.trim()}%`);
        }
        if (ingrediente && ingrediente.trim() !== '') {
            sql += ' AND i.ingrediente LIKE ?';
            params.push(`%${ingrediente.trim()}%`);
        }

        const [receitas] = await db.query(sql, params);

        if (receitas.length === 0) {
            return res.json([]);
        }

        const [todosIngredientes] = await db.query('SELECT * FROM ingredientes');

        const resultado = receitas.map(receita => ({
            ...receita,
            ingredientes: todosIngredientes
                .filter(item => item.id_receita === receita.id)
                .map(item => item.ingrediente)
        }));

        res.json(resultado);
    } catch (erro) {
        console.error('Erro ao buscar receitas:', erro);
        res.status(500).json({ erro: 'Erro ao buscar receitas no banco de dados' });
    }
};

adicionarReceita = async (req, res) => {
    const { nome, pais, categoria, foto, modo_de_preparo, autor, ingredientes } = req.body;

    try {
        const sqlReceita = `
            INSERT INTO receitas (nome, pais, categoria, foto, modo_de_preparo, autor) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [resultado] = await db.query(sqlReceita, [
            nome,
            pais,
            categoria,
            foto || null,
            modo_de_preparo,
            autor
        ]);

        const novaReceitaId = resultado.insertId;

        if (ingredientes && ingredientes.trim() !== '') {
            const listaIngredientes = ingredientes
                .split(/[\n,]+/)
                .map(item => item.trim())
                .filter(item => item.length > 0);

            if (listaIngredientes.length > 0) {
                const valoresIngredientes = listaIngredientes.map(ing => [novaReceitaId, ing]);
                await db.query(
                    'INSERT INTO ingredientes (id_receita, ingrediente) VALUES ?',
                    [valoresIngredientes]
                );
            }
        }

        res.redirect('/');
    } catch (erro) {
        console.error('Erro ao adicionar receita:', erro);
        res.status(500).json({ erro: 'Erro ao cadastrar receita no banco de dados' });
    }
};

buscarPorId = async (req, res) => {
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

module.exports = {
    buscarReceitas,
    adicionarReceita,
    buscarPorId
};