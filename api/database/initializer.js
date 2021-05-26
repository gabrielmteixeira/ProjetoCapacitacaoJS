const CustomerMusic = require('../entities/users/models/CustomerMusics');
const User = require('../entities/users/models/Users');
const Album = require('../entities/albums/models/Albums');
const Music = require('../entities/musics/models/Musics');

// The purpose of this file is to initialize the tables relations and sync them
// with the DB
Album.belongsTo(User, {as: 'author'});
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

User.sync({alter: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

Album.sync({alter: false})
  .then(() => {
    console.log('Album table was (re)created');
  })
  .catch((err) => console.log(err));

Music.sync({alter: false})
  .then(() => {
    console.log('Music table was (re)created');
  })
  .catch((err) => console.log(err));

CustomerMusic.sync({alter: false})
  .then(() => {
    console.log('CustomerMusic table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = {
  User,
  Album,
  Music,
  CustomerMusic,
};
