const Sequelize = require('sequelize');
module.exports = new Sequelize('movie', 'postgres', 'Aravipost', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
