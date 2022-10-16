/* L�gico_1: */

CREATE TABLE descritivo (
    id int PRIMARY KEY,
    texto varchar(100000),
    fk_Projeto_id int
);

CREATE TABLE requisitos_funcionais (
    id int PRIMARY KEY,
    nome varchar(100),
    condicao varchar(1000),
    crud varchar(100),
    getset varchar(100),
    sql_projeto varchar(100000)
);

CREATE TABLE tabela_requisitos (
    id int PRIMARY KEY,
    tipo varchar(25),
    fk_Projeto_id int
);

CREATE TABLE casos_de_uso (
    id int PRIMARY KEY,
    nome varchar(100),
    fk_Projeto_id int,
    fk_processos_caso_de_uso_id int
);

CREATE TABLE modelo_dados (
    id int PRIMARY KEY,
    atributos varchar(100),
    fk_Projeto_id int,
    fk_entidades_id int
);

CREATE TABLE projeto (
    id int PRIMARY KEY,
    nome varchar(100),
    fk_usuario_id int
);

CREATE TABLE requisitos (
    id int PRIMARY KEY,
    tipo varchar(25),
    descricao varchar(10000),
    fk_Tabela_de_requisistos_id int
);

CREATE TABLE processos_casos_de_uso (
    id int PRIMARY KEY,
    nome varchar(100)
);

CREATE TABLE entidades (
    id int PRIMARY KEY,
    nome varchar(100),
    atributos varchar(100),
    fk_Requisitos_funcionais_id int
);

CREATE TABLE usuario (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    username varchar(20),
    password varchar(30),
    email varchar(100)
);
 
ALTER TABLE descritivo ADD CONSTRAINT FK_descritivo_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL;
 
ALTER TABLE tabela_requisitos ADD CONSTRAINT FK_tabela_requisitos_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL;
 
ALTER TABLE casos_de_uso ADD CONSTRAINT FK_casos_de_uso_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL;
 
ALTER TABLE casos_de_uso ADD CONSTRAINT FK_casos_de_uso_3
    FOREIGN KEY (fk_processos_caso_de_uso_id)
    REFERENCES processos_casos_de_uso (id);
 
ALTER TABLE modelo_dados ADD CONSTRAINT FK_modelo_dados_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL;
 
ALTER TABLE modelo_dados ADD CONSTRAINT FK_modelo_dados_3
    FOREIGN KEY (fk_entidades_id)
    REFERENCES entidades (id);
 
ALTER TABLE projeto ADD CONSTRAINT FK_projeto_2
    FOREIGN KEY (fk_usuario_id)
    REFERENCES usuario (id);
 
ALTER TABLE requisitos ADD CONSTRAINT FK_requisitos_2
    FOREIGN KEY (fk_Tabela_de_requisistos_id)
    REFERENCES tabela_requisitos (id)
    ON DELETE SET NULL;
 
ALTER TABLE entidades ADD CONSTRAINT FK_entidades_2
    FOREIGN KEY (fk_Requisitos_funcionais_id)
    REFERENCES requisitos_funcionais (id);