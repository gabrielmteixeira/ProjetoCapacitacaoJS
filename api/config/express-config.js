require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usersRouter = require('../entities/users/controllers');
app.use('/users', usersRouter);

const albumsRouter = require('../entities/albums/controllers');
app.use('/albums', albumsRouter);

const musicsRouter = require('../entities/musics/controllers');
app.use('/musics', musicsRouter);

module.exports = app;
