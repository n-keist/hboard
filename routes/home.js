module.exports = (app) => {
    app.get('/', (_, response) => {
        response.json({
            app: {
                name: 'hboard',
                version: '1.0.0+b1',
            },
            author: {
                name: 'n-keist',
                git: 'https://github.com/n-keist',
                twitter: 'https://twitter.com/nokoflyboi'
            },
            dice: Math.floor(Math.random() * 6) + 1,
        });
    });
};