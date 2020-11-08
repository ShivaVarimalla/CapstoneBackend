const Router = require('express').Router();
const controller = require('../controllers/user.controller');

Router.get('/',controller.getAllUsers);
Router.post('/register',controller.register);
Router.post('/login',controller.login);
Router.get('/logout',controller.logout);

module.exports = Router;