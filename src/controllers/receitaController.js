const Receita = require('../modules/receitaModel');

const listar = (req, res) => {
  Receita.listarReceitas((err, receitas) => {
    if (err){
        return res.status(500).send('Erro ao listar receitas');
    }
    res.render('resultados', {receitas});
  });
};

const buscar = (req, res) => {
  const {tipo, q} = req.query;

  const buscas = {
    titulo: Receita.buscarTitulo,
    categoria: Receita.buscarCategoria,
    autor: Receita.buscarAutor,
    pais: Receita.buscarPais
  };

  const busca = buscas[tipo];
  if (!busca){
    return res.status(400).send('Tipo de busca inválido');
  }
  busca(q || '', (err, receitas) => {
    if (err){
        return res.status(500).send('Erro na busca');
    }
    res.render('resultados', {receitas});
  });
};

const criar = (req, res) => {
  const {titulo, categoria, autor} = req.body;
  Receita.adicionarReceita(titulo, categoria, autor, (err) => {
    if (err){
        return res.status(500).send('Erro ao salvar receita');
    }
    res.redirect('/');
  });
};

export {
  listar,
  buscar,
  criar
};