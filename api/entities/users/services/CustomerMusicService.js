const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const bcrypt = require('bcrypt');
const {unlink} = require('fs').promises;
const {Music, Album, CustomerMusic} = require('../../../database/initializer');
const path = require('path');

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
