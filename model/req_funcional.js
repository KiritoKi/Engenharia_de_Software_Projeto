class req_funcional {
    ID = 0;
    nome = '';
    condicao = '';
    crud = '';
    getset = '';
    sql_projeto = '';
    fk_projeto = 0;

    constructor(ID, nome, condicao, crud, getset, sql_projeto, fk_projeto) {
        this.ID = ID;
        this.nome = nome;
        this.condicao = condicao;
        this.crud = crud;
        this.getset = getset;
        this.sql_projeto = sql_projeto;
        this.fk_projeto = fk_projeto;
    }

    getID() {
        return this.ID;
    }
    setID(value) {
        this.ID = value;
    }
    getNome() {
        return this.nome;
    }
    setNome(value) {
        this.nome = value;
    }
    getCondicao() {
        return this.condicao;
    }
    setCondicao(value) {
        this.condicao = value;
    }
    getCrud() {
        return this.crud;
    }
    setCrud(value) {
        this.crud = value;
    }
    getGetset() {
        return this.getset;
    }
    setGetset(value) {
        this.getset = value;
    }
    getSql_projeto() {
        return this.sql_projeto;
    }
    setSql_projeto(value) {
        this.sql_projeto = value;
    }
    getFk_projeto() {
        return this.fk_projeto;
    }
    setFk_projeto(value) {
        this.fk_projeto = value;
    }

};

export default req_funcional;