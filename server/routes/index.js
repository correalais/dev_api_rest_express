const express = require('express');
const dbLivros = require('../db/livros.js');
const dbAutores = require('../db/autores.js');
const dbClientes = require('../db/clientes.js');
const app = express();

app.get('/livros', async (req, res) => {
    try {
        let results = await dbLivros.retornaTodosOsLivros();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/livros/:isbn', async (req, res) => {
    try {
        const param = req.params.isbn;
        let results = await dbLivros.procuraPorISBN(param);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}); 

app.get('/livros/nome/:nome', async (req, res) => {
    try {
        const param = req.params.nome;
        let results = await dbLivros.procuraPorNome(param);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/livros/emprestimo/consultar', async (req, res) => {
    try {
        let results = await dbLivros.visualizarEmprestimo();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.post('/livros', async (req, res) => {
    try {
        const livro = req.body;
        let results = await dbLivros.insereLivro(livro);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.post('/livros/emprestimo/retirar', async (req, res) => {
    try {
        const valores = req.body;
        let results = await dbLivros.retirarLivro(valores);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
app.put('/livros/emprestimo/devolver', async (req, res) => {
    try {
        const valores = req.body;
        let results = await dbLivros.devolverLivro(valores);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.delete('/livros/:id', async (req, res) => {
    try {
        const param = req.params.id;
        let results = await dbLivros.deletaLivro(param);
        res.json(results);
    } catch (err) {
        res.json(err.detail);
        res.sendStatus(400);
    }
});

app.put('/livros', async (req, res) => {
    try {
        const livro = req.body;
        let results = await dbLivros.updateLivro(livro);
        res.json(results);
        
       
    } catch (err) {
        res.json(err.detail);
        res.sendStatus(400);
    }
});

//////////////////////////////////////////////

app.post('/autores', async (req, res) => {
    try {
        const autor = req.body;
        let results = await dbAutores.insereAutor(autor);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.put('/autores', async (req, res) => {
    try {
        const params = req.params.id;
        const autor = req.body;
        let results = await dbAutores.updateAutor(autor);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/autores', async (req, res) => {
    try {
        let results = await dbAutores.listaAutores();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/autores/:id', async (req, res) => {
    try {
        const params = req.params.id;
        let results = await dbAutores.listaAutorPorId(params);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/autores/nome/:nome', async (req, res) => {
    try {
        const params = req.params.nome;
        let results = await dbAutores.listaAutorPorNome(params);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.delete('/autores/:id', async (req, res) => {
    try {
        const param = req.params.id;
        let results = await dbAutores.deletaAutor(param);
        res.json(results);
    } catch (err) {
        res.json(err.detail);
        res.sendStatus(400);
    }
});


/////////////////////////////////////////

app.post('/clientes', async (req, res) => {
    try {
        const cliente = req.body;
        let results = await dbClientes.insereCliente(cliente);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/clientes', async (req, res) => {
    try {
        let results = await dbClientes.listaClientes();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
app.get('/clientes/:matricula', async (req, res) => {
    try {
        const params = req.params.matricula;
        let results = await dbClientes.listaClientesMat(params);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/clientes/nome/:nome', async (req, res) => {
    try {
        const params = req.params.nome;
        let results = await dbClientes.listaClientesNome(params);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.put('/clientes', async (req, res) => {
    try {
        const cliente = req.body;
        let results = await dbClientes.updateCliente(cliente);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.delete('/clientes/:matricula', async (req, res) => {
    try {
        const param = req.params.matricula;
        let results = await dbClientes.deletaCliente(param);
        res.json(results);
    } catch (err) {
        res.json(err.detail);
        res.sendStatus(400);
    }
});


module.exports = app;