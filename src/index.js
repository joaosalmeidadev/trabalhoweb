const express = require('express');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});