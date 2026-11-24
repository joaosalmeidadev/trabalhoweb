const db = require('../config/db');

// Função auxiliar que busca receitas (todas ou filtradas) e anexa os ingredientes
const consultarReceitas = async (whereClause = '', params = [], callback) => {
  try {
    const sql = `SELECT * FROM receitas ${whereClause}`;
    const [receitas] = await db.query(sql, params);

    if (receitas.length === 0) {
      return callback(null, []);
    }

    const [ingredientes] = await db.query('SELECT * FROM ingredientes');

    const resultado = receitas.map(receita => ({
      ...receita,
      ingredientes: ingredientes
        .filter(item => item.id_receita === receita.id)
        .map(item => item.ingrediente)
    }));

    callback(null, resultado);
  } catch (err) {
    console.error('Erro na consulta:', err);
    callback(err, null);
  }
};

// Listar todas
const listarReceitas = (callback) => {
  consultarReceitas('', [], callback);
};

// Categoria como item fixo (=)
const buscarCategoria = (categoria, callback) => {
  consultarReceitas('WHERE categoria = ?', [categoria], callback);
};

// Buscas parciais (LIKE) - usa a coluna 'nome' do banco
const buscarTitulo = (titulo, callback) => {
  consultarReceitas('WHERE nome LIKE ?', [`%${titulo}%`], callback);
};

const buscarAutor = (autor, callback) => {
  consultarReceitas('WHERE autor LIKE ?', [`%${autor}%`], callback);
};

const buscarPais = (pais, callback) => {
  consultarReceitas('WHERE pais LIKE ?', [`%${pais}%`], callback);
};

// Adicionar receita
const adicionarReceita = async (dados, callback) => {
  const { nome, pais, categoria, foto, modo_de_preparo, autor, ingredientes } = dados;

  try {
    const sqlReceita = `
      INSERT INTO receitas (nome, pais, categoria, foto, modo_de_preparo, autor)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sqlReceita, [
      nome,
      pais || '',
      categoria,
      foto || null,
      modo_de_preparo || '',
      autor
    ]);

    const novaReceitaId = result.insertId;

    if (ingredientes && ingredientes.trim() !== '') {
      const lista = ingredientes
        .split(/[\n,]+/)
        .map(item => item.trim())
        .filter(item => item.length > 0);

      if (lista.length > 0) {
        const valores = lista.map(ing => [novaReceitaId, ing]);
        await db.query('INSERT INTO ingredientes (id_receita, ingrediente) VALUES ?', [valores]);
      }
    }

    callback(null, result);
  } catch (err) {
    console.error('Erro ao adicionar receita:', err);
    callback(err);
  }
};

module.exports = {
  adicionarReceita,
  listarReceitas,
  buscarCategoria,
  buscarTitulo,
  buscarAutor,
  buscarPais
};