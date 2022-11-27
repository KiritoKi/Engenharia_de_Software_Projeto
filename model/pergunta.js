class pergunta {
    id = 0;
    nome = '';
    yes_or_no = 0;

    constructor(id, nome, yes_or_no) {
        this.id = id;
        this.nome = nome;
        this.yes_or_no = yes_or_no;
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
    getYes_or_no() {
        return this.yes_or_no;
    }
    setYes_or_no(value) {
        this.yes_or_no = value;
    }

};

export default pergunta;