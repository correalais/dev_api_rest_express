const Client = require('pg').Pool;

const connection = new Client({
    password: '080194',
    user: 'postgres',
    database: 'trabalho_api',
    host: 'localhost',
    port: 5432
});

let autores = {};

autores.insereAutor = (autor) => {
    return new Promise((resolve, reject) => {
        connection.query ('INSERT INTO autor (id, nome, pais) VALUES ($1, $2, $3) RETURNING *', [autor.id, autor.nome, autor.pais], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

autores.updateAutor = (autor) => {
    return new Promise((resolve, reject) => {
        connection.query ('UPDATE autor SET id = $1, nome = $2, pais = $3 WHERE id = $1 RETURNING *', [autor.id, autor.nome, autor.pais], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

autores.listaAutores = () => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM autor', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

autores.listaAutorPorId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM autor WHERE id = $1', [id], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

autores.listaAutorPorNome = (nome) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM autor WHERE nome = $1', [nome], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

autores.deletaAutor = (id) => {
    return new Promise((resolve, reject) => {
        connection.query ('DELETE FROM autor WHERE id = $1', [id], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve('Autor deletado');
        });
    });
};

module.exports = autores;