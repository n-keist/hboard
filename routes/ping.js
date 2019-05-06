const db = require('../app/db');
const qr = require('qrcode-terminal');
const uuidv4 = require('uuid/v4');

module.exports = (app) => {
    app.get('/ping', async (_, response) => {
        let userQuery = await db.query('SELECT * FROM `users`;');
        if (userQuery.length == 0) {
            const uuid = uuidv4();
            process.env['SETUP_UUID'] = uuid;
            console.log('[hboard] It seems your instance is not set up yet, lets change that.');
            console.log('[hboard] Scan this QR-Code with your phone, to start configuration');
            qr.generate(uuid, { small: true }, (qrcode) => {
                console.log(qrcode);
            });
            console.log('[hboard] Waiting for further input..');
            response.json({
                setup: false
            });
        } else {
            response.json({
                setup: true
            });
        }
    });
};