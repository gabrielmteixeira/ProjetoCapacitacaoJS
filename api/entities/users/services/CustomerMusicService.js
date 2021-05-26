const {CustomerMusic} = require('../../../database/initializer');
const MusicService = require('../../musics/services/MusicService');
const AlbumService = require('../../albums/services/AlbumService');

class CustomerMusicService {
  async getMusics(userId) {
    const userMusicsRelations = await CustomerMusic.findAll(
      {where: {userId: userId}},
    );
    const userMusics = [];
    for (const musicRelation of userMusicsRelations) {
      const musicId = musicRelation.musicId;
      const music = await MusicService.getMusicById(musicId);
      userMusics.push(music);
    }
    return userMusics;
  }

  async checkHaveMusic(userId, musicId) {
    const haveMusic = await CustomerMusic.findOne({
      where: {userId: userId, musicId: musicId},
    });
    if (haveMusic) return true;
    return false;
  }

  async buyMusic(userId, musicId) {
    await CustomerMusic.create({userId, musicId});
  }

  async buyAlbum(userId, albumID) {
    const album = await AlbumService.getAlbumById(albumID);
    const albumMusics = await album.getMusics();
    for (const music of albumMusics) {
      this.buyMusic(userId, music.id);
    }
  }
}

module.exports = new CustomerMusicService();
