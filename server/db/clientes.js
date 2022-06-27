const Client = require('pg').Pool;

const connection = new Client({
    password: '080194',
    user: 'postgres',
    database: 'trabalho_api',
    host: 'localhost',
    port: 5432
});

let clientes = {};

clientes.insereCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        connection.query ('INSERT INTO cliente (matricula, nome, telefone) VALUES ($1, $2, $3) RETURNING *', [cliente.matricula, cliente.nome, cliente.telefone], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

clientes.listaClientes = () => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM cliente', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

clientes.listaClientesMat = (matricula) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM cliente WHERE matricula = $1', [matricula], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

clientes.listaClientesNome = (nome) => {
    return new Promise((resolve, reject) => {
        connection.query ('SELECT * FROM cliente WHERE nome = $1', [nome], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};


clientes.updateCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        connection.query ('UPDATE cliente SET matricula = $1, nome = $2, telefone = $3 WHERE matricula = $1 RETURNING *', [cliente.matricula, cliente.nome, cliente.telefone], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

clientes.deletaCliente = (matricula) => {
    return new Promise((resolve, reject) => {
        connection.query ('DELETE FROM cliente WHERE matricula = $1', [matricula], 
        (err, results) => {    
            if (err) {
                return reject(err);
            }
            return resolve('Cliente deletado');
        });
    });
};


module.exports = clientes;