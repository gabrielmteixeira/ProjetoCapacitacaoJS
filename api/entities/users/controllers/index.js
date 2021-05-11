const router = require('express').Router();
const UserService = require('../services/UserService');
const {
  loginMiddleware,
  checkRole,
  notLoggedIn} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');


router.post('/login', notLoggedIn(), loginMiddleware);

router.post('/', upload('createUser', 'user'), async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      image: req.file ? req.file.filename : 'default-user-icon.png',
      role: 'user',
      musicGenre: req.body.musicGenre,
      // birthday: req.body.birthday,
      birthday: Date.now(),
    };
    await UserService.createUser(user);
    res.status(204).end();
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
