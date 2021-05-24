const User = require('../entities/users/models/Users');
const Album = require('../entities/albums/models/Albums');
const Music = require('../entities/musics/models/Musics');
const sequelize = require('./index');
// const {DataTypes} = require('sequelize');

const customerMusic = sequelize.define('customerMusic', {
  /*
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
  */
});

// The purpose of this file is to initialize the tables relations and sync them
// with the DB

Album.belongsTo(User);
User.hasMany(Album, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true,
});

Music.belongsTo(Album);
Album.hasMany(Music, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true,
});

// force - This creates the table, dropping it first if it already existed
// alter - This checks what is the current state of the table in the  database,
// and then performs the necessary changes in the table to make it match the
// model.

User.sync({alter: true, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

Album.sync({alter: true, force: false})
  .then(() => {
    console.log('Album table was (re)created');
  })
  .catch((err) => console.log(err));

Music.sync({alter: true, force: false})
  .then(() => {
    console.log('Music table was (re)created');
  })
  .catch((err) => console.log(err));


Music.belongsToMany(User, {
  through: customerMusic,
  uniqueKey: false,
});

User.belongsToMany(Music, {
  through: customerMusic,
  uniqueKey: false,
});

customerMusic.sync({alter: true, force: false})
  .then(() => {
    console.log('customerMusic table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = {
  Album,
  Music,
  User,
};
