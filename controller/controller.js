import user from '../model/user.js';
import db from './db.js';

function register(user) {
    const params = [
        user.getNome(),
        user.getUsername(),
        user.getPassword(),
        user.getEmail()
    ];
    console.log("Inserting: " + params);

    let sql = "INSERT INTO usuario ";
    sql += "(nome,username, password, email) VALUES (?,?,?,?);";
    db.query(sql, params,
        function (err) {
            if (err) throw console.log("INSERT-ERROR FROM = " + params + "err = " + err)
        }
    );
}

function login(user) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM usuario WHERE (username = ?) and (password = ?) limit 1;";

        const params = [
            user.getUsername(),
            user.getPassword()
        ];

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

function getProjects(user_id) {
    return new Promise((resolve, reject) => {
        const params = [user_id];
        let sql = "SELECT * FROM projeto WHERE fk_usuario_id = ?";
        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result);
            }
        );
    });
}

function newProject(project) {
    const params = [
        project.getNome(),
        project.getFk_usuario_id()
    ];
    let sql = "INSERT INTO projeto (nome,fk_usuario_id) VALUES (?,?);";
    db.query(sql, params,
        function (err) {
            if (err) throw console.log("INSERT-ERROR FROM = " + params + "err = " + err)
        }
    );
}
function deleteProject(id) {
    let sql = "DELETE FROM projeto WHERE id=?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("DELETE (projeto)ERROR FROM ID = " + param + "err=" + err) }
    );
}

function selectLastProjectID() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM projeto ORDER BY id DESC limit 1;";
        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0].id);
        });
    });
}

function selectRequisitos(project_id) {
    return new Promise((resolve, reject) => {
        const params = [project_id];
        let sql = "SELECT * FROM requisitos_funcionais WHERE fk_projeto_id = ?";
        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result);
            }
        );
    });
}

function deleteRequisito(id) {
    let sql = "DELETE FROM requisitos_funcionais WHERE id=?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("DELETE (requisito)ERROR FROM ID = " + param + "err=" + err) }
    );
}

function newDesc(desc) {
    const params = [
        desc.getTexto(),
        desc.getFk_Projeto_id()
    ];
    let sql = "INSERT INTO descritivo (texto,fk_Projeto_id) VALUES (?,?);";
    db.query(sql, params,
        function (err) {
            if (err) throw console.log("INSERT-ERROR FROM = " + params + "err = " + err)
        }
    );
}

function getUser(user_id) {
    return new Promise((resolve, reject) => {
        const params = [user_id];
        let sql = "SELECT * FROM usuario WHERE id = ? limit 1";
        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result);
            }
        );
    });
}

function editUser(user) {
    const params = [
        user.getNome(),
        user.getUsername(),
        user.getPassword(),
        user.getEmail(),
        user.getId()
    ];
    console.log("Edit: " + params);

    let sql = "UPDATE usuario SET nome = ?, username = ?, password = ?, email = ? WHERE id = ?;";
    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE-ERROR FROM = " + params + "err = " + err) }
    );
}

function newReqFunc(req_func) {
    const params = [
        req_func.getNome(),
        req_func.getCondicao(),
        req_func.getCrud(),
        req_func.getGetset(),
        req_func.getFk_projeto()
    ];
    let sql = "INSERT INTO requisitos_funcionais";
    sql += "(nome, condicao, crud, getset, fk_projeto_id)VALUES (?,?,?,?,?); ";
    db.query(sql, params,
        function (err) { if (err) throw console.log("INSERT-ERROR FROM = " + params + "err = " + err) }
    );
}
export default {
    register, login, getProjects,
    getUser, newProject, newDesc,
    editUser, selectLastProjectID,
    newReqFunc, deleteProject,
    selectRequisitos, deleteRequisito
};