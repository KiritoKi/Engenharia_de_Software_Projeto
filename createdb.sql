/* L�gico_1: */

CREATE TABLE projeto (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    fk_usuario_id int
);

CREATE TABLE descritivo (
    id int PRIMARY KEY AUTO_INCREMENT,
    texto varchar(10000),
    fk_Projeto_id int
); 

CREATE TABLE usuario (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    username varchar(20),
    password varchar(30),
    email varchar(100)
);

CREATE TABLE requisitos_funcionais (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    condicao varchar(1000),
    crud varchar(100),
    getset varchar(100),
    sql_projeto varchar(10000),
    fk_projeto_id int
);

CREATE TABLE casos_de_uso (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    fk_projeto_id int
);

CREATE TABLE processos_casos_de_uso (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    tipo varchar(30),
    fk_projeto_id int,
    fk_requisito_id int
);

CREATE TABLE relacionamento_caso_uso (
    id int PRIMARY KEY AUTO_INCREMENT,
    fk_caso_1 int,
    fk_caso_2 int
);

CREATE TABLE entidades (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100),
    fk_Requisito_funcional_id int
);

CREATE TABLE relacionamento_entidades(
    id_ent1 int,
    id_ent2 int,
    cardinalidade varchar(10),
    PRIMARY KEY (id_ent1, id_ent2)
);

CREATE TABLE atributo (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome_atributo varchar(100),
    tipo_atributo varchar(20),
    fk_entidade_id int
);


 /* Sem Uso*/
CREATE TABLE requisitos (
    id int PRIMARY KEY AUTO_INCREMENT,
    tipo varchar(25),
    descricao varchar(10000),
    fk_Tabela_de_requisistos_id int
);

CREATE TABLE modelo_dados (
    id int PRIMARY KEY AUTO_INCREMENT,
    atributos varchar(100),
    fk_Projeto_id int,
    fk_entidades_id int
);

CREATE TABLE tabela_requisitos (
    id int PRIMARY KEY AUTO_INCREMENT,
    tipo varchar(25),
    fk_Projeto_id int
);
/* Sem Uso*/


ALTER TABLE descritivo ADD CONSTRAINT FK_descritivo_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;
 
ALTER TABLE casos_de_uso ADD CONSTRAINT FK_caso_de_uso
    FOREIGN KEY (fk_projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;
 
ALTER TABLE processos_casos_de_uso ADD CONSTRAINT FK_processos_casos_de_uso
    FOREIGN KEY (fk_projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE processos_casos_de_uso ADD CONSTRAINT FK_processos_casos_de_uso_2
    FOREIGN KEY (fk_requisito_id)
    REFERENCES requisitos_funcionais (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE projeto ADD CONSTRAINT FK_projeto_2
    FOREIGN KEY (fk_usuario_id)
    REFERENCES usuario (id);
 
ALTER TABLE entidades ADD CONSTRAINT FK_entidades_2
    FOREIGN KEY (fk_Requisito_funcional_id)
    REFERENCES requisitos_funcionais (id);

ALTER TABLE requisitos_funcionais ADD CONSTRAINT FK_req_func
    FOREIGN KEY (fk_projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE relacionamento_caso_uso ADD CONSTRAINT fk_relacionamento_caso_uso
    FOREIGN KEY (fk_caso_1)
    REFERENCES processos_casos_de_uso (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE relacionamento_caso_uso ADD CONSTRAINT fk_relacionamento_caso_uso_2
    FOREIGN KEY (fk_caso_2)
    REFERENCES processos_casos_de_uso (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE relacionamento_entidades ADD CONSTRAINT FK_relacionamento_entidades_1
    FOREIGN KEY (id_ent1)
    REFERENCES entidades (id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE relacionamento_entidades ADD CONSTRAINT FK_relacionamento_entidades_2
    FOREIGN KEY (id_ent2)
    REFERENCES entidades (id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE atributo ADD CONSTRAINT FK_atributo
    FOREIGN KEY (fk_entidade_id)
    REFERENCES entidades (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

/* Sem Uso */

ALTER TABLE tabela_requisitos ADD CONSTRAINT FK_tabela_requisitos
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE modelo_dados ADD CONSTRAINT FK_modelo_dados_2
    FOREIGN KEY (fk_Projeto_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;
 
ALTER TABLE modelo_dados ADD CONSTRAINT FK_modelo_dados_3
    FOREIGN KEY (fk_entidades_id)
    REFERENCES entidades (id);
    
ALTER TABLE requisitos ADD CONSTRAINT FK_requisitos_2
    FOREIGN KEY (fk_Tabela_de_requisistos_id)
    REFERENCES tabela_requisitos (id)
    ON DELETE SET NULL ON UPDATE CASCADE;
/* Sem Uso */

/* Module II */

CREATE TABLE perguntas(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250),
    yes_or_no int
);

CREATE TABLE itemPergunta (
    id int PRIMARY KEY AUTO_INCREMENT,
    value varchar(10),
    result int,
    fk_project_id int,
    fk_pergunta_id int
);

ALTER TABLE itemPergunta ADD CONSTRAINT FK_item_Pergunta
    FOREIGN KEY (fk_project_id)
    REFERENCES projeto (id)
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE itemPergunta ADD CONSTRAINT FK_item_Pergunta_2
    FOREIGN KEY (fk_pergunta_id)
    REFERENCES perguntas(id)
    ON DELETE SET NULL ON UPDATE CASCADE;

/* Insert Module II */
INSERT INTO perguntas (nome, yes_or_no)VALUES("É um Template PADRÃO para projetos em Engenharia de Software? (S/N)", 1);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Este é um projeto de investigação de tecnologia? (S/N)", 1);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Este é um projeto de aplicação corporativas comerciais e/ou administrativas? (S/N)", 1);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Este é um projeto da Internet(Web)? (S/N)", 0);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Seu projeto já começou? (S/N)", 0);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Você planeja usar a modelagem de negócios Orientada a Objetos? (S/N)", 1);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Você planeja usar requisitos Orientados a Objetos? (S/N)", 1);
INSERT INTO perguntas (nome, yes_or_no)VALUES("Diagramas de entidade-relacionamento (S/N)", 0);

    



