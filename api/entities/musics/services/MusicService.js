const {Music} = require('../models/Musics');

class MusicService {
    async createMusic(music) {
        await Music.create(music);
    }

    async getMusic(id) {
        music = await Music.findByPk(id);
        return music;
    }

    async getAllMusics() {
        musics = Music.findAll();
        return musics;
    }

    async alterMusic(id, music) {
        const musicFromDB = await Music.findByPk(id);
        musicFromDB.update(music);
    }

    async deleteMusic(id) {
        const music = await Music.findByPk(id);
        await music.destroy();
    }
}

module.exports = new MusicService;
