class atributo {
    id = 0;
    nome_atributo = '';
    tipo_atributo = '';
    fk_entidade_id = 0;

    constructor(id, nome_atributo, tipo_atributo, fk_entidade_id) {
        this.id = id;
        this.nome_atributo = nome_atributo;
        this.tipo_atributo = tipo_atributo;
        this.fk_entidade_id = fk_entidade_id;
    }

    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value;
    }
    getNome_atributo() {
        return this.nome_atributo;
    }
    setNome_atributo(value) {
        this.nome_atributo = value;
    }
    getTipo_atributo() {
        return this.tipo_atributo;
    }
    setTipo_atributo(value) {
        this.tipo_atributo = value;
    }
    getFk_entidade_id() {
        return this.fk_entidade_id;
    }
    setFk_entidade_id(value) {
        this.fk_entidade_id = value;
    }
};

export default atributo;