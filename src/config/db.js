const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'catalogo_receitas'
});
connection.connect((err) => {
if (err) {
console.error('Erro ao conectar: ' + err.stack);
return;
}
console.log('Conectado com ID ' + connection.threadId);
});
module.exports = connection;