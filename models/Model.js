const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Model = db.define('Model', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  glb: {
    type: DataTypes.STRING,
    require: true
  }
})

Model.belongsTo(User)
User.hasMany(Model)

module.exports = Model