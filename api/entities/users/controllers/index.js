const router = require('express').Router();
const UserService = require('../services/UserService');

router.post('/', async (req, res) => {
    try {
        await UserService.createUser(req.body.user);
        res.sendStatus(200);
    } catch (e) {
        (e) => console.log(e);
    }
});

// Get All
router.get('/', async (req, res) => {
    const users = await UserService.getAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.id);
        res.json(user);
    } catch (e) {
        (e) => console.log(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await UserService.alterUser(req.params.id, req.body.user);
        res.senStatus(200);
    } catch (e) {
        (e) => console.log(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        (e) => console.log(e);
    }
});

module.exports = router;
