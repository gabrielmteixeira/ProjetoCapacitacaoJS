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

        if (album !== null) {
            return album;
        } else {
            console.log(`Não há álbum com o ID ${id}!`);
        }
    }

    async getAllAlbums() {
        const albums = await Album.findAll();
        return albums;
    }

    async updateAlbumInfo(id, body) {
        const album = await Album.findByPk(id);

        if (album !== null) {
            await album.update(body);
        } else {
            console.log(`Não há álbum com  ID ${id}!`);
        }
    }

    async deleteAlbum(id) {
        const album = await Album.findByPk(id);

        if (album !== null) {
            await album.destroy();
        } else {
            console.log(`Não há álbum com  ID ${id}!`);
        }
    }
}

module.exports = new AlbumService();
