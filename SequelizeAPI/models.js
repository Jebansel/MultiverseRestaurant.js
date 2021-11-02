// get the seq package
const Sequelize = require("sequelize");

// model = outline of the data we'll store against an entity
const restaurantModel = {
  name: {
    type: Sequelize.STRING, // TEXT in sqlite
    allowNull: false,
    validate: {
      notNull: {
        msg: "not null",
      },
    },
  },
  imagelink: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must input a value",
      },
    },
  },
};

const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must input a value",
      },
    },
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must input a value",
      },
    },
  },
  price: {
    type: Sequelize.FLOAT, // may end up as "REAL" in sqlite
    allowNull: false,
    validate: {
      notNull: {
        msg: "Must input a value",
      },
    },
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
