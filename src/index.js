const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares precisam vir ANTES das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Rotas
// const receitaRoutes = require('./routes/receitaRoutes');
const apiRoutes = require('./routes/apiRoutes');

// app.use('/receitas', receitaRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});