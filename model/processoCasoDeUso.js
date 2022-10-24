class processoCasoDeUso {
    id = 0;
    nome = '';
    tipo = '';
    fk_caso_de_uso_id = 0;
    fk_requisito_id = 0;

    constructor(id, nome, tipo, fk_caso_de_uso_id, fk_requisito_id) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.fk_caso_de_uso_id = fk_caso_de_uso_id;
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
    getFk_caso_de_uso_id() {
        return this.fk_caso_de_uso_id;
    }
    setFk_caso_de_uso_id(value) {
        this.fk_caso_de_uso_id = value;
    }
    getFk_requisito_id() {
        return this.fk_requisito_id;
    }
    setFk_requisito_id(value) {
        this.fk_requisito_id = value;
    }
};

export default processoCasoDeUso;