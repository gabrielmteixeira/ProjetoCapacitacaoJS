const User = require('../entities/users/models/Users');
const Album = require('../entities/albums/models/Albums');
const Music = require('../entities/musics/models/Musics');

// The purpose of this file is to initialize the tables relations and sync them
// with the DB

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

Album.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

Music.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

User.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = {
  Album,
  Music,
  User,
};
