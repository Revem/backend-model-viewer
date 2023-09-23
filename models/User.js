const { DataTypes } = require('sequelize');

const db = require('../db/conn');
// Criação da tabela User no banco de dados
const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = User;