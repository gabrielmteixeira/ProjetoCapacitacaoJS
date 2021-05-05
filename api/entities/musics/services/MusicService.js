const Music = require('../models/Musics');

class MusicService {
    async getMusicById(id) {
        const music = await Music.findByPk(id);

        if (music !== null) {
            return music;
        } else {
            console.log(`Não há música com o ID ${id}!`);
        }
    }

    async getAllMusics() {
        const musics = await Music.findAll();
        return musics;
    }

    async updateMusicInfo(id, body) {
        const music = await Music.findByPk(id);

        if (music !== null) {
            await music.update(body);
        } else {
            console.log(`Não há música com  ID ${id}!`);
        }
    }

    async deleteMusic(id) {
        const music = await Music.findByPk(id);

        if (music !== null) {
            await music.destroy();
        } else {
            console.log(`Não há música com  ID ${id}!`);
        }
    }
}

module.exports = new MusicService();
