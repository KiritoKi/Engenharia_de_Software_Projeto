class itemPergunta {
    id = 0;
    value = '';
    result = 0;
    fk_project_id = 0;
    fk_pergunta_id = 0;


    constructor(id, value, result, fk_project_id, fk_pergunta_id) {
        this.id = id;
        this.value = value;
        this.result = result;
        this.fk_project_id = fk_project_id;
        this.fk_pergunta_id = fk_pergunta_id;
    }

    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value;
    }
    getFk_pergunta_id() {
        return this.fk_pergunta_id;
    }
    setFk_pergunta_id(value) {
        this.fk_pergunta_id = value;
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
    getFk_project_id() {
        return this.fk_project_id;
    }
    setFk_project_id(value) {
        this.fk_project_id = value;
    }
};

export default itemPergunta;