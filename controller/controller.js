import user from "../model/user.js";
import db from "./db.js";

// Função de registro do usuário
// Parâmetros:
//  - user: objeto do usuário contendo seus dados
function register(user) {
    const params = [
        user.getNome(),
        user.getUsername(),
        user.getPassword(),
        user.getEmail(),
    ];

    console.log("Inserting: " + params);

    let sql = "INSERT INTO usuario ";
    sql += "(nome,username, password, email) VALUES (?,?,?,?);";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR FROM = " + params + "err = " + err);
    });
}

// Função de login do usuário
// Parâmetros:
//  - user: objeto do usuário contendo seus dados
// Retorno:
//  - result: usuário encontrado na query
function login(user) {
    return new Promise((resolve, reject) => {
        const params = [user.getUsername(), user.getPassword()];
        let sql =
            "SELECT * FROM usuario WHERE (username = ?) and (password = ?) limit 1;";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result[0]);

            resolve(result[0]);
        });
    });
}

// Retorna os projetos a partir de um usuário
// Parâmetros:
//  - user_id: id do usuário
function getProjectsByUser(user_id) {
    return new Promise((resolve, reject) => {
        const params = [user_id];
        let sql = "SELECT * FROM projeto WHERE fk_usuario_id = ?";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);

            resolve(result);
        });
    });
}

// Função de criação de projeto
// Parâmetros:
//  - project: objeto do projeto
function newProject(project) {
    const params = [project.getNome(), project.getFk_usuario_id()];
    let sql = "INSERT INTO projeto (nome,fk_usuario_id) VALUES (?,?);";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR FROM = " + params + "err = " + err);
    });
}

// Função de get do projeto
// Parâmetros:
//  - id: id do projeto
function getProject(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT * FROM projeto WHERE id = ? limit 1";

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);

                resolve(result[0]);
            }
        );
    });
}

// Função de edit do projeto
// Parâmetros:
//  - project: objeto do projeto
function editProject(project) {
    const params = [
        project.getNome(),
        project.getID()
    ];
    let sql = "UPDATE projeto SET nome = ? WHERE id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR(projeto) FROM = " + params + " err = " + err) }
    );
}

// Função de delete do projeto
// Parâmetros:
//  - id: id do projeto
function deleteProject(id) {
    let param = parseInt(id);
    let sql = "DELETE FROM projeto WHERE id=?;";

    db.query(sql, param, function (err) {
        if (err)
            throw console.log(
                "DELETE (projeto)ERROR FROM ID = " + param + "err=" + err
            );
    });
}

// Retorna o último projeto inserido no banco de dados
// Retornos:
//  - result[0].id: id do projeto
function selectLastProjectID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM projeto ORDER BY id DESC limit 1;";

        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);

            resolve(result[0].id);
        });
    });
}

// Função de select dos requisitos baseado em um projeto
// Parâmetros:
//  - project_id: id do projeto
// Retornos:
//  - result: requisitos encontrados na query
function selectRequirementByProject(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT * FROM requisitos_funcionais WHERE fk_projeto_id = ?";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);

            resolve(result);
        });
    });
}

// Função de get de um requisito
// Parâmetros:
//  - id: id do requisito
function getRequirement(req_id) {
    return new Promise((resolve, reject) => {
        const params = [req_id];
        let sql = "SELECT * FROM requisitos_funcionais WHERE id = ? limit 1";

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);

                resolve(result[0]);
            }
        );
    });
}

// Função de edit do requisito funcional
// Parâmetros:
//  - requirement: objeto do requisito funcional
function editReqFunc(requirement) {
    const params = [
        requirement.getNome(),
        requirement.getCondicao(),
        requirement.getCrud(),
        requirement.getGetset(),
        requirement.getSql_projeto(),
        requirement.getID()
    ];
    console.log("Edit: " + params);
    let sql = "UPDATE requisitos_funcionais SET nome = ?, condicao = ?, crud = ?, getset = ?, sql_projeto = ? WHERE id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR FROM = " + params + "err = " + err) }
    );
}


// Função de delete do requisito
// Parâmetros:
//  - id: id do requisito
function deleteRequisito(id) {
    let param = parseInt(id);
    let sql = "DELETE FROM requisitos_funcionais WHERE id=?;";

    db.query(sql, param, function (err) {
        if (err)
            throw console.log(
                "DELETE (requisito)ERROR FROM ID = " + param + "err=" + err
            );
    });
}

// Função de novo descritivo
// Parâmetros:
//  - desc: objeto do descritivo
function newDesc(desc) {
    const params = [desc.getTexto(), desc.getFk_Projeto_id()];
    let sql = "INSERT INTO descritivo (texto,fk_Projeto_id) VALUES (?,?);";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR FROM = " + params + "err = " + err);
    });
}


// Função de obter descritivo por projeto 
// Parâmetros:
//  - project_id: id do projeto
function getDescByProject(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT * FROM descritivo WHERE fk_Projeto_id = ? limit 1";
        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result[0]);
            }
        );
    });
}

// Função de edit do descritivo
// Parâmetros:
//  - desc: objeto do descritivo
function editDesc(desc) {
    const params = [
        desc.getTexto(),
        desc.getFk_Projeto_id()
    ];
    let sql = "UPDATE descritivo SET texto = ? WHERE fk_Projeto_id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR(descritivo) FROM = " + params + " err = " + err) }
    );
}

// Função de get do usuário
// Parâmetros:
//  - user_id: id do usuário
function getUser(user_id) {
    return new Promise((resolve, reject) => {
        const params = [user_id];
        let sql = "SELECT * FROM usuario WHERE id = ? limit 1";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }

            resolve(result[0]);
        });
    });
}

// Função de edit do usuário
// Parâmetros:
//  - user: objeto do usuário
function editUser(user) {
    const params = [
        user.getNome(),
        user.getUsername(),
        user.getPassword(),
        user.getEmail(),
        user.getId(),
    ];
    console.log("Edit: " + params);
    let sql =
        "UPDATE usuario SET nome = ?, username = ?, password = ?, email = ? WHERE id = ?;";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("UPDATE-ERROR FROM = " + params + "err = " + err);
    });
}

// Função de novo requisito
// Parâmetros:
//  - req_func: objeto do novo requisito
function newReqFunc(req_func) {
    const params = [
        req_func.getNome(),
        req_func.getCondicao(),
        req_func.getCrud(),
        req_func.getGetset(),
        req_func.getFk_projeto(),
    ];
    let sql = "INSERT INTO requisitos_funcionais";
    sql += "(nome, condicao, crud, getset, fk_projeto_id)VALUES (?,?,?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR FROM = " + params + "err = " + err);
    });
}

// Função de get dos processos de caso de uso
// Parâmetros:
//  - project_id: id do projeto
function getUseCases(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT * FROM processos_casos_de_uso where fk_Projeto_id = ?";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);

            resolve(result);
        });
    });
}

function getProcesso(processo_id) {
    return new Promise((resolve, reject) => {
        const params = [processo_id];
        let sql = "SELECT * FROM processos_casos_de_uso WHERE id = ? limit 1";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }

            resolve(result[0]);
        });
    });
}

function newProcessoCaso(processoCaso) {
    const params = [
        processoCaso.getNome(),
        processoCaso.getTipo(),
        processoCaso.getFk_requisito_id()
    ];
    let sql = "INSERT INTO processos_casos_de_uso";
    sql += "(nome, tipo, fk_requisito_id)VALUES (?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(processoCaso) FROM = " + params + "err = " + err);
    });
}

function editProcessoCaso(processoCaso) {
    const params = [
        processoCaso.getNome(),
        processoCaso.getTipo(),
        processoCaso.getFk_requisito_id(),
        processoCaso.getId()
    ];
    let sql =
        "UPDATE processos_casos_de_uso SET nome = ?, tipo = ?, fk_requisito_id = ? WHERE id = ?;";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("UPDATE-ERROR(ProcessoCaso) FROM = " + params + "err = " + err);
    });
}


// Exportação das funções para o projeto
export default {
    register,
    login,
    getProjectsByUser,
    getUser,
    newProject,
    newDesc,
    editUser,
    selectLastProjectID,
    newReqFunc,
    deleteProject,
    selectRequirementByProject,
    deleteRequisito,
    getRequirement, getProject, getDescByProject,
    editReqFunc, editProject, editDesc,
    getUseCases, getProcesso, newProcessoCaso, editProcessoCaso
};
