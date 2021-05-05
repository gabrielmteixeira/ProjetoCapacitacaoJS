const router = require('express').Router();
const UserService = require('../services/UserService');

router.post('/register', async (req, res) => {
    const user = req.body;
    await UserService.createUser(user);
});

router.get('/login', async (req, res) => {});

router.post('/', async (req, res) => {
    try {
        const {user} = req.body;
        await UserService.createUser(user);
        res.sendStatus(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUser(userId);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// Get All
router.get('/', async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        const userId = req.params.id;
        const updatedUser = await UserService.alterUser(userId, body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await UserService.deleteUser(userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
