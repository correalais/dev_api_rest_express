CREATE TABLE livros (
    ISBN BIGINT PRIMARY KEY  NOT NULL,
    NOME VARCHAR(30) NOT NULL,
    AUTOR VARCHAR(30) NOT NULL,
    EDITORA VARCHAR(30) NOT NULL,
    ANO VARCHAR (30) NOT NULL,
    STATUS VARCHAR (30) NOT NULL
);

CREATE TABLE cliente (
    MATRICULA BIGINT PRIMARY KEY  NOT NULL,
    NOME VARCHAR(30) NOT NULL,
    TELEFONE BIGINT
);

CREATE TABLE autor (
    ID SERIAL PRIMARY KEY  NOT NULL,
    NOME VARCHAR(30) NOT NULL,
    PAIS VARCHAR (30) NOT NULL
);

CREATE TABLE emprestimo(
    ID SERIAL PRIMARY KEY NOT NULL,
    ISBN BIGINT NOT NULL,
    NOME VARCHAR (30) NOT NULL,
    CLIENTE VARCHAR (30) NOT NULL,
    MATRICULA BIGINT NOT NULL,
    DATA_RETIRADA DATE NOT NULL,
    DATA_ENTREGA DATE,
    FOREIGN KEY (isbn)
    REFERENCES livros (isbn),
    FOREIGN KEY (matricula)
    REFERENCES cliente (matricula)
);

CREATE OR REPLACE FUNCTION devolverLivro(_id bigint, _isbn bigint, _nome varchar(30), _cliente varchar(30), _matricula bigint, _data_entrega date)
RETURNS TABLE (isbn bigint, nome varchar(30), cliente varchar(30), matricula bigint, data_retirada date, data_entrega date) AS $$

DECLARE

_status Varchar (30) := ' ';

BEGIN	
	select status into _status from livros where livros.isbn = _isbn;
	update emprestimo set data_entrega = _data_entrega;
	if _status = 'Emprestado' then
		update livros set status = 'Disponivel' where livros.isbn = _isbn;
	end if;
	
	return query select emprestimo.isbn, emprestimo.nome, emprestimo.cliente, emprestimo.matricula, emprestimo.data_retirada, emprestimo.data_entrega from emprestimo;

END;

$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION retirarLivro(_isbn bigint, _nome varchar(30), _cliente varchar(30), _matricula bigint, _data_retirada date)
RETURNS TABLE (isbn bigint, nome varchar(30), cliente varchar(30), matricula bigint, data_retirada date, data_entrega date) AS $$

DECLARE

_status Varchar (30) := ' ';
_data_entrega date := null;

BEGIN	
	select status into _status from livros where livros.isbn = _isbn;
	if _status = 'Disponivel' then
		insert into emprestimo (isbn, nome, cliente, matricula, data_retirada, data_entrega)
		values (_isbn, _nome, _cliente, _matricula, _data_retirada, _data_entrega);
		update livros set status = 'Emprestado' where livros.isbn = _isbn;
	end if;
	
	return query select emprestimo.isbn, emprestimo.nome, emprestimo.cliente, emprestimo.matricula, emprestimo.data_retirada, emprestimo.data_entrega from emprestimo;

END;

$$ LANGUAGE PLPGSQL; 