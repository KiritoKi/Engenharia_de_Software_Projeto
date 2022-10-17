class projeto {
    ID = 0;
    nome = '';
    fk_usuario_id = 0;

    constructor(ID, nome, fk_usuario_id) {
        this.ID = ID;
        this.nome = nome;
        this.fk_usuario_id = fk_usuario_id;

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
    getFk_usuario_id() {
        return this.fk_usuario_id;
    }
    setFk_usuario_id(value) {
        this.fk_usuario_id = value;
    }

};

export default projeto;