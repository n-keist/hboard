module.exports = (app) => {
    app.post('/setup', (_, response) => {
        response.json({ ok: true });
    });
};