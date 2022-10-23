class entidade {
    id = 0;
    nome_atributo = '';
    fk_Requisito_funcional_id = 0;

    constructor(id, nome_atributo, fk_Requisito_funcional_id) {
        this.id = id;
        this.nome = nome_atributo;
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
        this.Fk_Requisito_funcional_id = value;
    }
};

export default entidade;