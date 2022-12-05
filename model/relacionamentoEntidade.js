class relacionamentoEntidade {
    id_ent2 = 0;
    id_ent2 = 0;
    cardinalidade = '';

    constructor(id_ent1, id_ent2, cardinalidade) {
        this.id_ent1 = id_ent1;
        this.id_ent2 = id_ent2;
        this.cardinalidade = cardinalidade;
    }

    getId_ent1() {
        return this.id_ent1;
    }
    setId_ent1(value) {
        this.id_ent1 = value;
    }
    getId_ent2() {
        return this.id_ent2;
    }
    setId_ent2(value) {
        this.id_ent2 = value;
    }
    getCardinalidade() {
        return this.cardinalidade;
    }
    setCardinalidade(value) {
        this.cardinalidade = value;
    }
};

export default relacionamentoEntidade;