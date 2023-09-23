const jwt = require('jsonwebtoken');
const User = require("../models/User");

//Encontrar usuário pelo token jwt
const getUserByToken = async (token) => {

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  };

  const decoded = jwt.verify(token, "#tokensecret@12vvhpp!");
  const userId = decoded.id;
  const user = await User.findByPk(userId);

  return user;
};

module.exports = getUserByToken;