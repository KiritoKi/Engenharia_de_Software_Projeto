import user from '../model/user.js';
import db from './db.js';

function register(user) {
    const params = [
        user.getNome(),
        user.getData_nascimento(),
        user.getUsername(),
        user.getPassword(),
        user.Email()
    ];
    console.log("Inserting: " + params);

    let sql = "INSERT INTO user ";
    sql += "(nome, data_nascimento, username, password, email) VALUES (?,?,?,?,?);";
    db.query(sql, params,
        function (err) {
            if (err) throw console.log("INSERT-ERROR FROM = " + params + "err = " + err)
        }
    );
}

function selectLogin(login_name) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users";
        slq += "WHERE(username = ?)"

        const params = [login_name];

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

function login() {

}


export default {};