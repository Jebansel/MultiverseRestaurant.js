// get the seq package
const Sequelize = require('sequelize');

// model = outline of the data we'll store against an entity
const restaurantModel = {
  name: {
    type: Sequelize.STRING, // TEXT in sqlite
    allowNull: false,
    notEmpty: true,
  },
  imagelink: {
    type: Sequelize.STRING,
    allowNull: false,
    isDecimal: false,
  },
};


const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  price: {
    type: Sequelize.FLOAT, // may end up as "REAL" in sqlite
    allowNull: false,
    notEmpty: true,
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };