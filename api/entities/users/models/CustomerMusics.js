const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');

const CustomerMusic = sequelize.define('CustomerMusic', {
  userId: {
    type: DataTypes.STRING(21),
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  musicId: {
    type: DataTypes.STRING(21),
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'Musics',
      key: 'id',
    },
  },
});

module.exports = CustomerMusic;
