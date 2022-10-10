class user {
    ID = 0;
    nome = '';
    data_nascimento = '';
    username = '';
    password = '';
    email = '';

    constructor(ID, nome, data_nascimento, username, password, email) {
        this.ID = ID;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.username = username;
        this.password = password;
        this.email = email;
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
    getData_nascimento() {
        return this.data_nascimento;
    }
    setData_nascimento(value) {
        this.data_nascimento = value;
    }
    getUsername() {
        return this.username;
    }
    setUsername(value) {
        this.username = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = value;
    }
    getEmail() {
        return this.email;
    }
    setEmail(value) {
        this.email = value;
    }

};

export default user;