const Router = require('express').Router();
const controller = require('../controllers/user.controller');
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
const token = req.header("user-token");
if (!token) return res.status(401).json({ error: "Access denied" });
try {
const verified = jwt.verify(token, 'IAmAbsolute');
req.user = verified;
next(); // to continue the flow
} catch (err) {
res.status(400).json({ error: "Token is not valid" });
}
};

Router.get('/',controller.getAllUsers);
Router.post('/register',controller.register);
Router.post('/login',controller.login);
Router.get('/logout',controller.logout);
Router.get('/profile',verifyToken,controller.myProfile);


module.exports = Router;