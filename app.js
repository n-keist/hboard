require('dotenv').config();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[hboard] Clustering...');
    console.log(`[hboard] Master #${process.pid} is up`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    console.log('[hboard] Ready!');

    cluster.on('online', () => {
        console.log('[hboard] Worker is up.');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`[hboard] Worker ${worker.process.pid} died.`);
    });
} else {
    const appIO = require('./app/io');

    appIO.app.listen(process.env.APP_PORT, process.env.APP_HOST, () => null);
}