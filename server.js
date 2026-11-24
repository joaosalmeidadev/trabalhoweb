require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configura a conexão com o MySQL Workbench
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Rota GET que traz todas as receitas e seus respectivos ingredientes
app.get('/receitas', async (req, res) => {
  try {
    const [receitas] = await pool.query('SELECT * FROM receitas');
    const [ingredientes] = await pool.query('SELECT * FROM ingredientes');

    // Junta os ingredientes dentro de cada receita correspondente
    const resultado = receitas.map(receita => ({
      ...receita,
      ingredientes: ingredientes
        .filter(item => item.id_receita === receita.id)
        .map(item => item.ingrediente)
    }));

    res.json(resultado);
  } catch (erro) {
    console.error('Erro ao conectar no banco:', erro);
    res.status(500).json({ erro: 'Falha ao buscar receitas no MySQL' });
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando! Acesse http://localhost:5000/receitas');
});