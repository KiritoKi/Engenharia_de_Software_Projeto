import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: 'kirito',
    password: 'yanVP&123456',
    database: 'db_software_engineering'
});

connection.connect();

export default connection;"
