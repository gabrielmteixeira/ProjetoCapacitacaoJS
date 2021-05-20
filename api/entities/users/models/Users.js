const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const {nanoid} = require('nanoid');
// const Album = require('../../albums/models/Albums');

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

// Album.belongsTo(User);

// User.hasMany(Album, {
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
//   hooks: true,
// });

// force - This creates the table, dropping it first if it already existed
// alter - This checks what is the current state of the table in the  database,
// and then performs the necessary changes in the table to make it match the
// model.
// User.sync({alter: false, force: false})
//   .then(() => {
//     console.log('User table was (re)created');
//   })
//   .catch((err) => console.log(err));

module.exports = User;
