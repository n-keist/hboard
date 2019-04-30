module.exports = {
    tables: [
        'users',
    ],
    queries: {
        users: 'CREATE TABLE IF NOT EXISTS users (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `username` varchar(16) NOT NULL DEFAULT \'\', `password` text NOT NULL, `token` varchar(32) NOT NULL DEFAULT \'\', `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`));',
    }
};