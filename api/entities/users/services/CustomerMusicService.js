const {Music, Album, CustomerMusic} = require('../../../database/initializer');

class CustomerMusicService {
  async getMusics(userId) {
    try {
      const userMusics = await CustomerMusic.find({userId: userId});
      console.log(userMusics);
    } catch (error) {
      throw error;
    }
  }

  async checKHaveMusic(userId) {}

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
