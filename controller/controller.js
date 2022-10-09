import db from './db.js';

function register() {

}

function selectLogin(login_name) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users";
        slq += "WHERE(login_name = ?)"

        const params = [login_name];

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result[0]);
            }
        )
    })
}

function login() {

}


export default {};