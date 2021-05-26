const {CustomerMusic} = require('../../../database/initializer');
const MusicService = require('../../musics/services/MusicService');
class CustomerMusicService {
  async getMusics(userId) {
    try {
      const userMusicsRelations = await CustomerMusic.findAll({userId: userId});
      const userMusics = [];
      for (const musicRelation of userMusicsRelations) {
        const musicId = musicRelation.musicId;
        const music = await MusicService.getMusicById(musicId);
        userMusics.push(music);
      }
      return userMusics;
    } catch (error) {
      throw error;
    }
  }

  async checkHaveMusic(userId, musicId) {}

  async buyMusic(userId, musicId) {
    try {
      await CustomerMusic.create({userId, musicId});
    } catch (error) {
      throw error;
    }
  }

  async buyAlbum(albumID) {}
}

module.exports = new CustomerMusicService();
