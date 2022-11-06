class relCasoUso {
    id = 0;
    fk_caso_1 = 0;
    fk_caso_2 = 0;

    constructor(id, fk_caso_1, fk_caso_2) {
        this.id = id;
        this.fk_caso_1 = fk_caso_1;
        this.fk_caso_2 = fk_caso_2;
    }

    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value;
    }
    getFk_caso_1() {
        return this.fk_caso_1;
    }
    setFk_caso_1(value) {
        this.fk_caso_1 = value;
    }
    getFk_caso_2() {
        return this.fk_caso_2;
    }
    setFk_caso_2(value) {
        this.fk_caso_2 = value;
    }
};

export default relCasoUso;