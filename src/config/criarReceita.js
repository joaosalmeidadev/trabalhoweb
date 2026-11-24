const criarReceita = (titulo, categoria, autor, ingredientes, modo_preparo) => {
    const novaReceita = {
        titulo: titulo,
        categoria: categoria,
        autor: autor,
        ingredientes: ingredientes,
        modo_preparo: modo_preparo
    };
    connection.query(
        'INSERT INTO receitas SET ?',
        novaReceita,
        (error, results) => {
            if (err) {
                console.error('Erro na consulta:', error);
                return;
            }
            else callback(null, results);
        });
};