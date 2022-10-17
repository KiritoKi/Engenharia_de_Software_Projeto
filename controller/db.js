import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: 'fabio',
    password: '123456789',
    database: 'engenharia_software'
});

connection.connect();

export default connection;
