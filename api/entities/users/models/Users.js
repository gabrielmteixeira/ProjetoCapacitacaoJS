const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const {nanoid} = require('nanoid');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.STRING(21),
    defaultValue: () => nanoid(),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'user', 'artist'],
    allowNull: false,
  },
  musicGenre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  purchasedMusics: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
