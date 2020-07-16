'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theatre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Movie,{onDelete:'cascade'});
    }
  };
  Theatre.init({
    name: DataTypes.STRING,
    row: DataTypes.INTEGER,
    col: DataTypes.INTEGER,
    booked: DataTypes.ARRAY(DataTypes.STRING),
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theatre',
  });
  return Theatre;
};