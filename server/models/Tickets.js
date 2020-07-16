'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  };
  Tickets.init({
    movieName: DataTypes.STRING,
    movieInfo: DataTypes.STRING,
    movieDesc: DataTypes.STRING,
    movieImg: DataTypes.STRING,
    location: DataTypes.STRING,
    theatreName: DataTypes.STRING,
    showTime: DataTypes.STRING,
    date: DataTypes.STRING,
    noOfTickets: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return Tickets;
};