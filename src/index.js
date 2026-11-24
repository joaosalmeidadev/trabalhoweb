const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

//const receitaRoutes = require('./routes/receitaRoutes');
const apiRoutes = require('./routes/apiRoutes');


//app.use('/receitas', receitaRoutes);
app.use('/api', apiRoutes);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});