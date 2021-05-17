const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const Album = require('../models/Albums');

class AlbumService {
  async createAlbum(album) {
    try {
      const createdAlbum = await Album.create(album);
      return createdAlbum;
    } catch (error) {
      throw error;
    }
  }

  async getAlbumById(id) {
    const album = await Album.findByPk(id);

    if (!album) {
      throw new InvalidParamError(`Não há álbum com o ID ${id}!`);
    }
    return album;
  }

  async getAllAlbums() {
    const albums = await Album.findAll();
    if (!albums) {
      throw new EmptyDatabaseError(
        'Não existem entidades na tabela requisitada');
    }
    return albums;
  }

  async updateAlbumInfo(id, body) {
    const album = await Album.findByPk(id);

    if (!album) {
      throw new InvalidParamError(`Não há álbum com  ID ${id}!`);
    }
    await album.update(body);
  }

  async deleteAlbum(id) {
    const album = await Album.findByPk(id);

    if (!album) {
      throw InvalidParamError(`Não há álbum com  ID ${id}!`);
    }
    await album.destroy();
  }
}

module.exports = new AlbumService();
