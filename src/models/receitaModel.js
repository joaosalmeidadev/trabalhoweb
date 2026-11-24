import connection from '../config/db.js';

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

const buscarCategoria = (categoria, callback) => {
  buscar('SELECT * FROM receitas WHERE categoria = ?', [categoria], callback);
};

const buscarTitulo = (titulo, callback) => {
  buscar('SELECT * FROM receitas WHERE titulo LIKE ?', [`%${titulo}%`], callback);
};

const buscarAutor = (autor, callback) => {
  buscar('SELECT * FROM receitas WHERE autor LIKE ?', [`%${autor}%`], callback);
};

const buscarIngrediente = (ingrediente, callback) => {
  buscar('SELECT * FROM receitas WHERE ingredientes LIKE ?', [`%${ingrediente}%`], callback);
};

export{
    listarReceitas,
    buscarCategoria,
    buscarTitulo,
    buscarAutor,
    buscarIngrediente
}