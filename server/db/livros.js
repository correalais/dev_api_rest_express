const Client = require('pg').Pool;

const connection = new Client({
    password: '080194',
    user: 'postgres',
    database: 'trabalho_api',
    host: 'localhost',
    port: 5432
});

let livros = {};

livros.retornaTodosOsLivros = () => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM livros', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    })
}

livros.procuraPorISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM livros WHERE isbn = $1', [isbn], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    })
}

livros.insereLivro = (livro) => {
    return new Promise((resolve, reject) => {
        connection.query ('INSERT INTO livros (isbn, nome, autor, editora, ano, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [livro.isbn, livro.nome, livro.autor, livro.editora, livro.ano, livro.status], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    })
}

livros.deletaLivro = (isbn) => {
    return new Promise((resolve, reject) => {
        connection.query ('DELETE FROM livros WHERE isbn = $1', [isbn], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve('Livro deletado');
        })
    })
}

livros.procuraPorNome = (nome) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM livros WHERE nome = $1', [nome], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    })
}

livros.updateLivro = (livro) => {
    return new Promise((resolve, reject) => {
        connection.query ('UPDATE livros SET nome = $2, autor = $3, editora = $4, ano = $5, status = $6 WHERE isbn = $1 RETURNING *',
         [livro.isbn, livro.nome, livro.autor, livro.editora, livro.ano, livro.status], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    })
}

livros.retirarLivro = (valores) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM retirarLivro($1, $2, $3, $4, $5)',
         [valores.isbn, valores.nome, valores.cliente, valores.matricula, valores.data_retirada], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
}
livros.devolverLivro = (valores) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM devolverLivro($1, $2, $3, $4, $5, $6)',
         [valores.id, valores.isbn, valores.nome, valores.cliente, valores.matricula, valores.data_entrega], (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
}


module.exports = livros;