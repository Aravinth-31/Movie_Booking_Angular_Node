'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Theatre);
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    TheatreId:DataTypes.INTEGER,
    Date:DataTypes.STRING,
    showtime:DataTypes.STRING,
    row:DataTypes.INTEGER,
    col:DataTypes.INTEGER,
    booked:DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};