import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: '###',
    password: '###',
    database: 'db__software_engineering'
});

connection.connect();

export default connection;
