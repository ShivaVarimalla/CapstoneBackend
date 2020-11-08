const Router = require('express').Router();
const controller = require('../controllers/room.controller');

Router.get('/',controller.getAllRooms);
Router.post('/create',controller.create);

module.exports = Router;