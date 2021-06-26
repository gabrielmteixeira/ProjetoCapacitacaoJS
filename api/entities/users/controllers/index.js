const router = require('express').Router();
const UserService = require('../services/UserService');
const CustomerMusicService =
  require('../../users/services/CustomerMusicService');
const {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');
const {userValidate} = require('../../../middlewares/user-validator');
const {requestFilter} = require('../../../middlewares/object-filter');
const blacklist = require('../../../redis/blacklist');
const passwordToken = require('../../../redis/password-token');
const SendMailService = require('../services/SendMailService');
const path = require('path');

router.post(
  '/login',
  requestFilter('body', ['email', 'password']),
  notLoggedIn(),
  userValidate('login'),
  loginMiddleware,
);

router.get('/logout',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      await blacklist.addToken(token);

      req.logout();
      res.clearCookie('jwt');
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  upload('createUser', 'user'),
  requestFilter('body', [
    'email',
    'username',
    'password',
    'passwordConfirmation',
    'name',
    'image',
    'role',
    'musicGenre',
    'birthday',
  ]),
  notLoggedIn(),
  userValidate('registerUser'),
  async (req, res, next) => {
    try {
      const user = req.body;
      user.image = req.file ? req.file.filename : 'default-user-icon.png';
      user.role = 'user';
      // \/Posteriormente será fornecido pelo fonrt e sairá daki
      (user.birthday = Date.now()), await UserService.createUser(user);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.post('/roleUpdate/:id',
  jwtMiddleware,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const allowedRoles = ['user', 'admin', 'artist'];
      const userID = req.params.id;
      const role = req.body.role;
      if (allowedRoles.indexOf(role) === -1) {
        throw new InvalidParamError(
          'A role fornecida é uma role inexistente. Use uma das seguinte' +
          ' opções: admin, artist, user.');
      }
      const user = await UserService.updateRole(userID, role);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/forgotPassword',
  notLoggedIn('Você não pode usar a funcionalidade de Esqueci Minha Senha ' +
  'estando logado!'),
  userValidate('forgotPassword'),
  async (req, res, next) => {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      if (user) {
        const mailInfo = {
          receiver: user.email,
          sender: '"Sistema ijunior 👻" <ijunior@ijunior.com.br>',
          subject: 'Redefinição der Senha',
        };

        mailInfo.path = await path
          .resolve(__dirname, '..', 'views', 'email.html');

        const token = await passwordToken.generateToken((user.email));

        const viewVariables = {
          HOST_URL: process.env.HOST_URL,
          token,
        };

        await SendMailService.send(mailInfo, viewVariables);
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.post('/resetPassword',
  notLoggedIn('Você não pode usar a funcionalidade de Esqueci Minha Senha ' +
  'estando logado!'),
  requestFilter('body', [
    'password',
    'passwordConfirmation',
    'token',
  ]),
  userValidate('resetPassword'),
  async (req, res, next) => {
    try {
      const token = req.body.token;
      const password = req.body.password;
      await UserService.resetPassword(token, password);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

// Get All
router.get('/',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/user/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

// Get one user's musics
router.get('/musics',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userMusics = await CustomerMusicService.getMusics(userId);
      res.status(200).json(userMusics);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/changePassword',
  jwtMiddleware,
  requestFilter('body', [
    'email',
    'oldPassword',
    'newPassword',
    'passwordConfirmation',
  ]),
  userValidate('changePassword'),
  async (req, res, next) => {
    try {
      await UserService.updatePassword(req.user.id, req.password);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/',
  jwtMiddleware,
  upload('updateUser', 'user'),
  requestFilter('body', [
    'email',
    'username',
    'name',
    'image',
    'role',
    'musicGenre',
    'birthday',
  ]),
  userValidate('updateUser'),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const body = req.body;
      body.image = req.file ? req.file.fillename : undefined;
      const userId = req.user.id;
      const updatedUser = await UserService.alterUser(userId, body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      await UserService.deleteUser(userId);
      res.status(200).json('Seu usuário foi deletado com sucesso!');
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/admin/:id',
  jwtMiddleware,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.status(200).json('Usuário deletado com sucesso!');
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
