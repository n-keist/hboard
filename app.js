require('dotenv').config();
const cluster = require('cluster');

let numCPUs = require('os').cpus().length;

if (process.env.CLUSTER_LIMIT != 0) {
    numCPUs = process.env.CLUSTER_LIMIT;
}

const databaseSchema = require('./schema/database');
const db = require('./app/db');
db.query('SHOW TABLES;').then((tables) => {
    let dbTables = [];
    tables.forEach((table) => {
        dbTables.push(table[`Tables_in_${process.env.MYSQL_DATABASE}`]);
    });
    databaseSchema.tables.forEach((table) => {
        if (!dbTables.includes(table)) {
            db.query(databaseSchema.queries[table]);
            console.log(`[hboard] Created ${table} from schema.`)
        }
    });
});

if (cluster.isMaster) {
    console.log('[hboard] Clustering...');
    console.log(`[hboard] Master #${process.pid} is up`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        console.log(`[hboard] Cluster (${i + 1}/${numCPUs}) forked.`);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`[hboard] Worker ${worker.process.pid} died.`);
    });
} else {
    const appIO = require('./app/io');

    appIO.app.listen(process.env.APP_PORT, process.env.APP_HOST, () => null);
}