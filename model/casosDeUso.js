class casosDeUso {
    id = 0;
    nome = '';
    fk_Projeto_id = 0;
    fk_processos_caso_de_uso_id = 0;

    constructor(id, texto, fk_Projeto_id, fk_processos_caso_de_uso_id) {
        this.id = id;
        this.nome = nome;
        this.fk_Projeto_id = fk_Projeto_id;
        this.fk_processos_caso_de_uso_id = fk_processos_caso_de_uso_id;
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
        return this.fk_Projeto_id;
    }
    setFk_Projeto_id(value) {
        this.fk_Projeto_id = value;
    }
    getFk_processos_caso_de_uso_id() {
        return this.fk_processos_caso_de_uso_id;
    }
    setFk_processos_caso_de_uso_id(value) {
        this.fk_processos_caso_de_uso_id = value;
    }
};

export default casosDeUso;