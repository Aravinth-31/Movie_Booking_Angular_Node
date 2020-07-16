'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieName: {
        type: Sequelize.STRING
      },
      movieInfo: {
        type: Sequelize.STRING
      },
      movieDesc: {
        type: Sequelize.STRING
      },
      movieImg: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      theatreName: {
        type: Sequelize.STRING
      },
      showTime: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      noOfTickets: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId:{
        type:Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  }
};