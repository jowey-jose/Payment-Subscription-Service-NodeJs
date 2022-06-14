module.exports = function(app) {
    const userHandlers = require('../controllers/userController.js')

    // Auth JWT Routes
    app.route('/tasks')
        .post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/login')
        .post(userHandlers.login);
};