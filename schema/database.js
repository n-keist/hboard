module.exports = {
    tables: [
        'users', 'roles', 'roles_users', 'permissions', 'role_permissions'
    ],
    queries: {
        users: 'CREATE TABLE IF NOT EXISTS users (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `username` varchar(16) NOT NULL DEFAULT \'\', `password` text NOT NULL, `token` varchar(32) NOT NULL DEFAULT \'\', `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`));',
        roles: 'CREATE TABLE IF NOT EXISTS roles (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(8), PRIMARY KEY (`id`));',
        roles_users: 'CREATE TABLE IF NOT EXISTS roles_users (`user` int(11), `role` int(11));',
        permissions: 'CREATE TABLE IF NOT EXISTS permissions (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(16) NOT NULL, PRIMARY KEY (`id`));',
        role_permissions: 'CREATE TABLE IF NOT EXISTS role_permissions (`role` int(11), `permission` int(11));',
    },
};