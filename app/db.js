const mariadb = require('mariadb');

let pool = mariadb.createPool({
    host: process.env.MYSQL_HOSTNAME,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: process.env.MYSQL_POOL_LIMIT
});

module.exports = pool;