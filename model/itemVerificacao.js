class itemVerificacao {
    id = 0;
    nome = '';
    value = '';
    result = 0;
    yes_or_no = 0;
    fk_project_id = 0;

    constructor(id, nome, value, result, yes_or_no, fk_project_id) {
        this.id = id;
        this.nome = nome;
        this.value = value;
        this.result = result;
        this.yes_or_no = yes_or_no;
        this.fk_project_id = fk_project_id;
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
    getResult() {
        return this.result;
    }
    setResult(value) {
        this.result = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getYesOrNo() {
        return this.yes_or_no;
    }
    setYesOrNo(value) {
        this.yes_or_no = value;
    }
    getFk_project_id() {
        return this.fk_project_id;
    }
    setFk_project_id(value) {
        this.fk_project_id = value;
    }
};

export default itemVerificacao;