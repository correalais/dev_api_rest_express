const express = require('express');
const db = require('../db');
const app = express();

app.get('/', async (req, res) => {
    try {
        let results = await db.retornaTodosOsLivros();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/:isbn', async (req, res) => {
    try {
        const param = req.params.isbn;
        let results = await db.procuraPorISBN(param);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}); 

app.get('/nome/:nome', async (req, res) => {
    try {
        const param = req.params.nome;
        let results = await db.procuraPorNome(param);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.post('/', async (req, res) => {
    try {
        const livro = req.body;
        let results = await db.insereLivro(livro);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const param = req.params.id;
        let results = await db.deletaLivro(param);
        res.json(results);
    } catch (err) {
        res.json(err.detail);
        res.sendStatus(400);
    }
});



module.exports = app;