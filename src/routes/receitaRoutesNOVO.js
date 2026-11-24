import express from 'express';
import {listarReceitas, buscarCategoria, buscarTitulo, buscarAutor, buscarIngrediente} from './models/receitaModel.js';

const app = express();

app.get('/receitas/categoria/:nome', (req, res) => {
  buscarCategoria(req.params.nome, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar' });
    res.json(results);
  });
});

app.get('/receitas/titulo/:titulo', (req, res) => {
  buscarTitulo(req.params.titulo, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar' });
    res.json(results);
  });
});

app.get('/receitas/autor/:nome_autor', (req, res) => {
  buscarAutor(req.params.nome_autor, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar' });
    res.json(results);
  });
});