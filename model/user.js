class user {
    ID = 0;
    nome = '';
    username = '';
    password = '';
    email = '';

    constructor(ID, nome, username, password, email) {
        this.ID = ID;
        this.nome = nome;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    getId() {
        return this.ID;
    }
    setId(value) {
        this.ID = value;
    }
    getNome() {
        return this.nome;
    }
    setNome(value) {
        this.nome = value;
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