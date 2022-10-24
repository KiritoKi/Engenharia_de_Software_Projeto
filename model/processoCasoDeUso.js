class processoCasoDeUso {
    id = 0;
    nome = '';
    tipo = '';
    fk_projeto_id = 0;
    fk_requisito_id = 0;

    constructor(id, nome, tipo, fk_projeto_id, fk_requisito_id) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.fk_projeto_id = fk_projeto_id;
        this.fk_requisito_id = fk_requisito_id;
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
    getTipo() {
        return this.tipo;
    }
    setTipo(value) {
        this.tipo = value;
    }
    getFk_projeto_id() {
        return this.fk_projeto_id;
    }
    setFk_projeto_id(value) {
        this.fk_projeto_id = value;
    }
    getFk_requisito_id() {
        return this.fk_requisito_id;
    }
    setFk_requisito_id(value) {
        this.fk_requisito_id = value;
    }
};

export default processoCasoDeUso;