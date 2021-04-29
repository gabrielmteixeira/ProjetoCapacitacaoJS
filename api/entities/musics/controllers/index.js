const router = require('express').Router();
const MusicService = require('../services/MusicService');

router.post('/', async (req, res) => {
    try {
        const newMusic = req.body;
        newMusic.releaseDate = new Date();
        await MusicService.createMusic(newMusic);

        res.status(200).json(newMusic);
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const musics = await MusicService.getAllMusics();
        res.status(200).json(musics);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    // duvida se eh realmente assim (a ideia eh ser users/userid)
    try {
        const music = await MusicService.getMusicById(req.params.id);

        res.status(200).json(music);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        body = req.body;
        musicId = req.params.id;
        await MusicService.updateMusicInfo(musicId, body);

        res.status(200).json({...body, ...{id: musicId}});
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const musicId = req.params.id;
        music = await MusicService.getMusicById(musicId);
        await MusicService.deleteMusic(musicId);

        res.status(200).json(music);
    } catch (e) {
        console.log(error);
    }
});

module.exports = router;
