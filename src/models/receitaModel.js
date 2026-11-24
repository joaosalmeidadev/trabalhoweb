const connection = require('../config/db.js');

const adicionarReceita = (titulo, categoria, autor, callback) => {
  const sql = 'INSERT INTO receitas (titulo, categoria, autor) VALUES (?, ?, ?)';
  connection.query(sql, [titulo, categoria, autor], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar receita:', err);
      return callback(err);
    }
    callback(null, result);
  });
}; 

const buscar = (sql, params, callback) => {
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

const listarReceitas = (callback) => {
  buscar('SELECT * FROM receitas', [], callback);
};

//categoria precisa ser um item fixo
const buscarCategoria = (categoria, callback) => {
  buscar('SELECT * FROM receitas WHERE categoria = ?', [categoria], callback);
};

const buscarTitulo = (titulo, callback) => {
  buscar('SELECT * FROM receitas WHERE titulo LIKE ?', [`%${titulo}%`], callback);
};

const buscarAutor = (autor, callback) => {
  buscar('SELECT * FROM receitas WHERE autor LIKE ?', [`%${autor}%`], callback);
};

const buscarPais = (pais, callback) => {
  buscar('SELECT * FROM receitas Where pais LIKE ?', [`%${pais}%`], callback);
}

export{
    adicionarReceita,
    listarReceitas,
    buscarCategoria,
    buscarTitulo,
    buscarAutor,
    buscarPais
}