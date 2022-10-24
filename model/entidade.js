class entidade {
    id = 0;
    nome = '';
    fk_Requisito_funcional_id = 0;

    constructor(id, nome, fk_Requisito_funcional_id) {
        this.id = id;
        this.nome = nome;
        this.fk_Requisito_funcional_id = fk_Requisito_funcional_id;
    }

    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value;
    }
    getNome() {
        return this.nome;
    }
    setNome(value) {
        this.nome = value;
    }
    getFk_Req_Func_id() {
        return this.fk_Requisito_funcional_id;
    }
    setFk_Req_Func_id(value) {
        this.fk_Requisito_funcional_id = value;
    }
};

export default entidade;