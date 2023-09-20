const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('modelviewer', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Conectamos com sucesso!')
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize