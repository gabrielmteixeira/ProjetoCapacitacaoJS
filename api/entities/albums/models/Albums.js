const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const {nanoid} = require('nanoid');
// const Music = require('../../musics/models/Musics');

// TODO: Rever relação autor - album

const Album = sequelize.define('Albums', {
  id: {
    type: DataTypes.STRING(21),
    defaultValue: () => nanoid(),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


// Music.belongsTo(Album);
// Album.hasMany(Music, {
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
//   hooks: true,
// });

// force - This creates the table, dropping it first if it already existed
// alter - This checks what is the current state of the table in the  database,
// and then performs the necessary changes in the table to make it match the
// model.
// Album.sync({alter: true, force: true})
//   .then(() => {
//     console.log('User table was (re)created');
//   })
//   .catch((err) => console.log(err));

// Music.sync({alter: true, force: true})
//   .then(() => {
//     console.log('User table was (re)created');
//   })
//   .catch((err) => console.log(err));

module.exports = Album;
