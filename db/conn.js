const { Sequelize } = require('sequelize');

// Iniciar uma instância do sequelize para realizar alterações no banco de dados.
const sequelize = new Sequelize('modelviewer', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectamos com sucesso!');
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
};

module.exports = sequelize;