class casoDeUso {
    id = 0;
    nome = '';
    fk_projeto_id = 0;

    constructor(id, nome, fk_projeto_id) {
        this.id = id;
        this.nome = nome;
        this.fk_projeto_id = fk_projeto_id;
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
    getFk_Projeto_id() {
        return this.fk_projeto_id;
    }
    setFk_Projeto_id(value) {
        this.fk_projeto_id = value;
    }
};

export default casoDeUso;