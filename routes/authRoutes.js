const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// middleware
const verifyToken = require('../helpers/verify-token');
//Rotas de autenticação do usuário
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/checkuser', AuthController.checkUser);
router.get('/user/:id', AuthController.getUserById);
router.patch('/user/edit/:id', verifyToken, AuthController.editUser);

module.exports = router;