'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      TheatreId:{
        type:Sequelize.INTEGER
      },
      Date:{
        type:Sequelize.STRING
      },
      showtime:{
        type:sequelize.STRING
      },
      row:{
        type:Sequelize.INTEGER
      },
      col:{
        type:Sequelize.INTEGER
      },
      booked:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};