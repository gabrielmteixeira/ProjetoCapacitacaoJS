const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const {nanoid} = require('nanoid');

const Musics = sequelize.define('Musics', {
    id: {
        type: DataTypes.STRING(21),
        defaultValue: () => nanoid(),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING(21),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    single: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM,
        values: [
            'Rock',
            'Pop',
            'Hip-Hop',
            'Rap',
            'Eletronica',
            'Sertanejo',
            'Funk',
            'Indie',
            'Others'],
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

const Albums = sequelize.define('Albums', {
    id: {
        type: DataTypes.STRING(21),
        defaultValue: () => nanoid(),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    musicId: {
        type: DataTypes.STRING(21),
        foreignKey: true,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING(21),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    single: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM,
        values: [
            'Rock',
            'Pop',
            'Hip-Hop',
            'Rap',
            'Eletronica',
            'Sertanejo',
            'Funk',
            'Indie',
            'Others'],
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// force - This creates the table, dropping it first if it already existed
// alter - This checks what is the current state of the table in the  database,
// and then performs the necessary changes in the table to make it match the
// model.
Musics.sync({alter: true, force: false})
    .then(()=>{
        console.log('User table was (re)created');
    })
    .catch((err)=> console.log(err));
Albums.sync({alter: true, force: false})
    .then(()=>{
        console.log('User table was (re)created');
    })
    .catch((err)=> console.log(err));
