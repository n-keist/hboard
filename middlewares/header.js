const db = require('../app/db');
module.exports = (app) => {
    app.use(async (request, response, next) => {
        if (request.path.startsWith('/api')) {
            if (request.headers['authentication'] != null) {
                let auth = reqeust.headers['authentication'];
                let authResult = await db.query('SELECT id FROM users WHERE token = ?;', [auth]);
                if (authResult.length > 0) {
                    next();
                } else {
                    response.status(401).json({
                        success: false,
                        reason: 'The Authentication Header you provided wasn\'t found in the database',
                        weight: 'heavy',
                    });
                }
            } else {
                response.status(401).json({
                    success: false,
                    reason: 'You didn\'t provide an Authentication Header',
                    weight: 'heavy',
                });
            }
        } else {
            next();
        }
    });
};