const MusicService = require('../../musics/services/MusicService');
const AlbumService = require('../../albums/services/AlbumService');
const UserService = require('./UserService');

class CustomerMusicService {
  async getMusics(userId) {
    const user = await UserService.getUser(userId);
    const userMusics = await user.getMusics();
    return userMusics;
  }

  async checkHaveMusic(userId, musicId) {
    const user = await UserService.getUser(userId);
    const music = await MusicService.getMusicById(musicId);
    const haveMusic = await user.hasMusic(music);
    if (haveMusic) return true;
    return false;
  }

  async buyMusic(userId, musicId) {
    const music = await MusicService.getMusicById(musicId);
    const user = await UserService.getUser(userId);
    await user.addMusic(music);
  }

  async buyAlbum(userId, albumID) {
    const user = await UserService.getUser(userId);
    const album = await AlbumService.getAlbumById(albumID);
    const albumMusics = await album.getMusics();
    await user.addMusics(albumMusics);
  }
}

module.exports = new CustomerMusicService();
