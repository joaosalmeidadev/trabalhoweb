const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'catalogo_receitas',
    port: process.env.DB_PORT || 3306
});

// Testa a conexão ao iniciar o servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err.message);
        return;
    }
    console.log('Conectado ao MySQL (catalogo_receitas) com ID ' + connection.threadId);
    connection.release();
});

module.exports = pool.promise();