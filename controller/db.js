import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: 'USER',
    password: 'PASSWORD',
    database: 'db_software_engineering'
});

connection.connect();

export default connection;
