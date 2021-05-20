const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const {Music} = require('../../../database/initializer');

class MusicService {
  async getMusicById(id) {
    const music = await Music.findByPk(id);
    if (!music) {
      throw new InvalidParamError(`Não há música com o ID ${id}!`);
    }

    return music;
  }

  async getAllMusics() {
    const musics = await Music.findAll();
    if (!musics) {
      throw new EmptyDatabaseError(
        'Não existem entidades na tabela requisitada');
    }

    return musics;
  }

  async updateMusicInfo(id, body) {
    const music = await Music.findByPk(id);
    if (!music) {
      throw new InvalidParamError(`Não há música com  ID ${id}!`);
    }

    await music.update(body);
  }

  async deleteMusic(id) {
    const music = await Music.findByPk(id);
    if (!music) {
      throw InvalidParamError(`Não há música com  ID ${id}!`);
    }

    await music.destroy();
  }
}

module.exports = new MusicService();
