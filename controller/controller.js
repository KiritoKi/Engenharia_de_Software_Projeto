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

function listProject(user) {
    return new Promise((register, reject) => {
        const params = [
            user.getID()
        ];

        let sql = "SELECT * FROM user WHERE id = ?";
    })
}


export default { register, login, listProject };