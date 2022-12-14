import db from "./db.js";

//----------------------------------
//  Usuário
//----------------------------------

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


//----------------------------------
//  Projeto
//----------------------------------


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

                resolve(result[0]);
            }
        );
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


//----------------------------------
//  Descritivo
//----------------------------------


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


//----------------------------------
//  Usuário
//----------------------------------


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


//----------------------------------
//  RequisitosFuncionais
//----------------------------------


// Função de novo requisito
// Parâmetros:
//  - req_func: objeto do novo requisito
function newReqFunc(req_func) {
    const params = [
        req_func.getNome(),
        req_func.getCondicao(),
        req_func.getCrud(),
        req_func.getGetset(),
        req_func.getSql_projeto(),
        req_func.getFk_projeto()
    ];
    let sql = "INSERT INTO requisitos_funcionais";
    sql += "(nome, condicao, crud, getset, sql_projeto, fk_projeto_id)VALUES (?,?,?,?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(requisito funcional) FROM = " + params + "err = " + err);
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

                resolve(result[0]);
            }
        );
    });
}
// Função de get do id do ultimo requisito cadastrado
// Retornos:
//  - result[0].id: id do requisito
function selectLastRequisitoID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM requisitos_funcionais ORDER BY id DESC limit 1;";

        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0].id);
        });
    });
}
// Função de get do id da requisição pelo nome da requisição
// Parâmetros:
//  - value: nome
//  - projeto_id: id do projeto
// Retornos:
//  - result[0]: retorna o id da requisição
function getReqIDbyName(value, projeto_id) {
    return new Promise((resolve, reject) => {
        const param = [value, projeto_id];
        const sql = "SELECT * FROM requisitos_funcionais WHERE nome = ? AND fk_projeto_id = ?;";

        db.query(sql, param, function (err, result, fields) {
            if (err) reject(err);
            if (result[0])
                resolve(result[0].id);
            else
                resolve(null);
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


//----------------------------------
//  Entidade
//----------------------------------


// Função insert entidade
// Parâmetros:
//  - entidade: entidade para insert
function newEntidade(entidade) {
    const params = [
        entidade.getNome(),
        entidade.getFk_Req_Func_id()
    ];
    let sql = "INSERT INTO entidades";
    sql += "(nome, fk_Requisito_funcional_id)VALUES (?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(entidade) FROM = " + params + "err = " + err);
    });
}
// Função de update entidade
// Parâmetros:
//  - entidade: entidade para update
function editEntidade(entidade) {
    const params = [
        entidade.getNome(),
        entidade.getID()
    ];
    let sql = "UPDATE entidades SET nome = ? WHERE id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR(entidade) FROM = " + params + " err = " + err) }
    );
}
// Função de delete de entidade
// Parâmetros:
//  - id_requisito: id do requisito
function deleteEntidade(id_requisito) {
    let param = [id_requisito];
    let sql = "DELETE FROM entidades WHERE fk_Requisito_funcional_id=?;";

    db.query(sql, param, function (err) {
        if (err)
            throw console.log(
                "DELETE (entidade)ERROR FROM ID = " + param + "err=" + err
            );
    });
}
// Função de get entidade
// Parâmetros:
//  - req_id: id do requisito
// Retornos:
//  - result: retorna entidade
function getEntidade(ent_id) {
    return new Promise((resolve, reject) => {
        const params = [ent_id];
        let sql = "SELECT * FROM entidades WHERE id = ? limit 1";

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }

                resolve(result);
            }
        );
    });
}
// Função de get do id da ultima entidade cadastrada
// Retornos:
//  - result[0].id: id da entidade
function selectLastEntidadeID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM entidades ORDER BY id DESC limit 1;";

        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0].id);
        });
    });
}
// Função de get entidade (Busca por projeto id)
// Parâmetros:
//  - project_id: id do projeto
// Retornos:
//  - result: lista de entidades
function getEntidadeByProject(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];

        let sql = "SELECT ent.* FROM entidades AS ent, requisitos_funcionais AS req "
        sql += "WHERE req.fk_projeto_id = ? AND ent.fk_Requisito_funcional_id=req.id;";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);

            resolve(result);
        });
    });
}


//----------------------------------
//  RelacionamentoEntidade
//----------------------------------


function newRelacionamentoEntidade(relacionamento) {
    const params = [
        relacionamento.getId_ent1(),
        relacionamento.getId_ent2(),
        relacionamento.getCardinalidade()
    ];
    let sql = "INSERT INTO relacionamento_entidades";
    sql += "(id_ent1,id_ent2, cardinalidade)VALUES (?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(relacionamento_entidades) FROM = " + params + "err = " + err);
    });
}

function getRelacionamentoEntidade() {
    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM relacionamento_entidades;";

        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}


//----------------------------------
//  Atributo
//----------------------------------


function getAtributoByEnt(id_entidade) {
    return new Promise((resolve, reject) => {
        const param = [id_entidade];
        const sql = "SELECT * FROM atributo WHERE fk_entidade_id = ?;";

        db.query(sql, param, function (err, result, fields) {
            if (err) reject(err);
            if (result)
                resolve(result);
            else
                resolve(null);
        });
    });
}

function newAtributo(atributo) {
    const params = [
        atributo.getNome_atributo(),
        atributo.getTipo_atributo(),
        atributo.getFk_entidade_id()
    ];
    let sql = "INSERT INTO atributo";
    sql += "(nome_atributo, tipo_atributo, fk_entidade_id)VALUES (?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(atributo) FROM = " + params + "err = " + err);
    });
}

function editAtributo(atributo) {
    const params = [
        atributo.getNome_atributo(),
        atributo.getTipo_atributo(),
        atributo.getID()
    ];
    let sql = "UPDATE atributo SET nome_atributo = ?, tipo_atributo = ? WHERE id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR(atributo) FROM = " + params + " err = " + err) }
    );
}

function getAtributoIDbyName(value, fk_entidade_id) {
    return new Promise((resolve, reject) => {
        const param = [value, fk_entidade_id];
        const sql = "SELECT * FROM atributo WHERE nome_atributo = ? AND fk_entidade_id = ?;";

        db.query(sql, param, function (err, result, fields) {
            if (err) reject(err);
            if (result[0])
                resolve(result[0].id);
            else
                resolve(null);
        });
    });
}

function getAtributosByProject(id_project) {
    return new Promise((resolve, reject) => {
        const param = [id_project];
        let sql = "SELECT atr.nome_atributo, atr.fk_entidade_id, ent.fk_Requisito_funcional_id";
        sql += " FROM atributo AS atr, entidades AS ent, requisitos_funcionais AS req";
        sql += " WHERE atr.fk_entidade_id = ent.id AND ent.fk_Requisito_funcional_id = req.id AND req.fk_projeto_id = ? ;";

        db.query(sql, param, function (err, result, fields) {

            if (err) reject(err);
            if (result)
                resolve(result);
            else
                resolve(null);
        });
    });
}

// Função de get Atributo
// Parâmetros:
//  - atributo_id: id do atributo
// Retornos:
//  - result[0]: retorna o atributo
function getAtributo(atributo_id) {
    return new Promise((resolve, reject) => {
        const params = [atributo_id];
        let sql = "SELECT * FROM atributo WHERE id = ? limit 1";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result[0]);
        });
    });
}


//----------------------------------
//  ProcessoCasoUso
//----------------------------------


// Função de inserir um novo processo de caso de uso
// Parâmetros:
//  - processo para inserção
function newProcessoCaso(processoCaso) {
    const params = [
        processoCaso.getNome(),
        processoCaso.getTipo(),
        processoCaso.getFk_projeto_id(),
        processoCaso.getFk_requisito_id()
    ];
    let sql = "INSERT INTO processos_casos_de_uso";
    sql += "(nome, tipo, fk_projeto_id, fk_requisito_id)VALUES (?,?,?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(processoCaso) FROM = " + params + "err = " + err);
    });
}
// Função de update processo caso de uso
// Parâmetros:
//  - processoCaso: processo para update
function editProcessoCaso(processoCaso) {
    const params = [
        processoCaso.getNome(),
        processoCaso.getTipo(),
        processoCaso.getFk_projeto_id(),
        processoCaso.getFk_requisito_id(),
        processoCaso.getID()
    ];
    let sql =
        "UPDATE processos_casos_de_uso SET nome = ?, tipo = ?, fk_projeto_id = ?, fk_requisito_id = ? WHERE id = ?;";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("UPDATE-ERROR(ProcessoCaso) FROM = " + params + "err = " + err);
    });
}
// Função de delete do processo caso de uso
// Parâmetros:
//  - id_requisito: id do processo
function deleteProcessoCaso(id) {
    let param = [id];
    let sql = "DELETE FROM processos_casos_de_uso WHERE id=?;";

    db.query(sql, param, function (err) {
        if (err)
            throw console.log(
                "DELETE (processoCaso)ERROR FROM ID = " + param + "err=" + err
            );
    });
}
// Função de get processo caso de uso (Busca por projeto id)
// Parâmetros:
//  - project_id: id do projeto
// Retornos:
//  - result: lista de processos de caso de uso
function getProcessoCasoUsoByProject(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];

        let sql = "SELECT * FROM processos_casos_de_uso WHERE fk_projeto_id = ?";

        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);

            resolve(result);
        });
    });
}
function getProcessoIDbyName(value, projeto_id) {
    return new Promise((resolve, reject) => {
        const param = [value, projeto_id];
        const sql = "SELECT * FROM processos_casos_de_uso WHERE nome = ? AND fk_projeto_id = ?;";

        db.query(sql, param, function (err, result, fields) {
            if (err) reject(err);
            if (result[0])
                resolve(result[0].id);
            else
                resolve(null);
        });
    });
}
// Função de get Processos de caso de Uso
// Parâmetros:
//  - processo_id: id do processo
// Retornos:
//  - result[0]: retorna o processo
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

//----------------------------------
//  RelacionamentoCasoUso
//----------------------------------


function selectRelacionamentoCasoUso() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM relacionamento_caso_uso;";
        const param = [];
        db.query(sql, param, function (err, result, fields) {

            if (err) reject(err);
            if (result)
                resolve(result);
            else {
                resolve(null);
            }

        });
    });
}

function newRelCasoUso(rel) {
    const params = [
        rel.getFk_caso_1(),
        rel.getFk_caso_2()
    ];
    let sql = "INSERT INTO relacionamento_caso_uso";
    sql += "(fk_caso_1, fk_caso_2)VALUES (?,?); ";

    db.query(sql, params, function (err) {
        if (err)
            throw console.log("INSERT-ERROR(relCasoUso) FROM = " + params + "err = " + err);
    });
};


//----------------------------------
//  Pergunta
//----------------------------------


function newPergunta(item) {
    const params = [
        item.getNome(),
        item.getYes_or_no()
    ];
    let sql = "INSERT INTO perguntas(nome, yes_or_no)VALUES (?,?);";
    db.query(sql, [], function (err, result, fields) {
        if (err) reject(err);
        resolve(result[0]);
    });
}
//Perguntas/itemPergunta
function getPerguntas(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT p.*, i_p.value,i_p.result, i_p.fk_pergunta_id FROM perguntas AS p LEFT JOIN itemPergunta AS i_p ON p.id = i_p.fk_pergunta_id AND i_p.fk_project_id = ?;";
        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}


//----------------------------------
//  itemPergunta
//----------------------------------


function selectItemPerguntaIDbyProjectANDpergunta(id_projeto, id_pergunta) {
    return new Promise((resolve, reject) => {
        const params = [
            id_projeto,
            id_pergunta
        ];
        const sql = "SELECT * FROM itemPergunta WHERE fk_project_id = ? AND fk_pergunta_id = ? limit 1;";

        db.query(sql, params, function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });

}

function newItemPergunta(item) {
    const params = [
        item.getValue(),
        item.getResult(),
        item.getFk_project_id(),
        item.getFk_pergunta_id()
    ];

    let sql = "INSERT INTO itemPergunta(value, result, fk_project_id, fk_pergunta_id)VALUES (?,?,?,?);";

    db.query(sql, params,
        function (err) { if (err) throw console.log("INSERT-ERROR(newItemPergunta) FROM = " + params + "err = " + err); }
    );
}

function editItemPergunta(item) {
    const params = [
        item.getValue(),
        item.getResult(),
        item.getID()
    ];
    let sql = "UPDATE itemPergunta SET value = ?, result = ? WHERE id = ?;";

    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR(itemPergunta) FROM = " + params + " err = " + err); }
    );
}

function deleteitemPergunta(id_item) {
    let param = [id_item];
    let sql = "DELETE FROM itemPergunta WHERE id=?;";

    db.query(sql, param, function (err) {
        if (err)
            throw console.log(
                "DELETE (itemPergunta)ERROR FROM ID = " + param + "err=" + err
            );
    });
}

function getResultPerguntas(project_id) {
    return new Promise((resolve, reject) => {

        let sql = "SELECT value, result, fk_pergunta_id from itemPergunta WHERE fk_project_id = ?;";
        db.query(sql, params, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}


//----------------------------------
//  Funções Utilitárias
//----------------------------------


function calculaResult(value, expected) {
    if (expected == 1)
        if (value == 'Y')
            return 10
        else
            return 0
    else if (expected == 0)
        if (value == 'N')
            return 10
        else
            return 0
}


//----------------------------------
//  Exportação
//----------------------------------

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
    getRequirement,
    getProject,
    getDescByProject,
    editReqFunc,
    editProject,
    editDesc,
    getProcesso,
    newProcessoCaso,
    editProcessoCaso,
    getProcessoCasoUsoByProject,
    getEntidadeByProject,
    getEntidade,
    selectLastRequisitoID,
    newEntidade,
    editEntidade,
    getReqIDbyName,
    deleteProcessoCaso,
    deleteEntidade,
    getAtributoByEnt,
    selectLastEntidadeID,
    newAtributo,
    editAtributo,
    getAtributoIDbyName,
    selectRelacionamentoCasoUso,
    getAtributosByProject,
    newRelCasoUso,
    getProcessoIDbyName,
    newItemPergunta,
    deleteitemPergunta,
    getResultPerguntas,
    getPerguntas,
    calculaResult,
    newPergunta,
    editItemPergunta,
    selectItemPerguntaIDbyProjectANDpergunta,
    getRelacionamentoEntidade,
    newRelacionamentoEntidade,
    getAtributo
};
