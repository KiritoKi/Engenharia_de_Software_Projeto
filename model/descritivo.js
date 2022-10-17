class descritivo {
    ID = 0;
    texto = '';
    fk_Projeto_id = 0;

    constructor(ID, texto, fk_Projeto_id) {
        this.ID = ID;
        this.texto = texto;
        this.fk_Projeto_id = fk_Projeto_id;
    }

    getID() {
        return this.ID;
    }
    setID(value) {
        this.ID = value;
    }
    getTexto() {
        return this.texto;
    }
    setTexto(value) {
        this.texto = value;
    }
    getFk_Projeto_id() {
        return this.fk_Projeto_id;
    }
    setFk_Projeto_id(value) {
        this.fk_Projeto_id = value;
    }
};

export default descritivo;