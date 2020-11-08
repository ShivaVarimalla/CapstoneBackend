const Router = require('express').Router();
const controller = require('../controllers/message.controller');

Router.get('/:room',controller.getMessagesInRoom);

module.exports = Router;