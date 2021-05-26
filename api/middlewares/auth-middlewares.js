const NotAuthorizedError = require('../errors/NotAuthorizedError');
const passport = require('passport');
const {unlink} = require('fs').promises;
const jwt = require('jsonwebtoken');
const path = require('path');

function loginMiddleware(req, res, next) {
  passport.authenticate(
    'login',
    (error, user) => {
      try {
        if (error) {
          throw error;
        }

        req.login(user, {session: false}, (err) => {
          console.log(err);
          if (err) {
            throw err;
          }

          // Aqui ficam as informações a serem guardadas no cookie (jwt)
          const body = {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.image,
          };
          const token = jwt.sign({user: body}, process.env.SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRATION});

          res.cookie('jwt', token, {
            // Opções do cookie:
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
          });
          res.status(200).send('Logado com sucesso!');
        });
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
}

function jwtMiddleware(req, res, next) {
  passport.authenticate('jwt', {session: false}, (error, user) => {
    try {
      if (error) next(error);

      if (!user) {
        throw new NotAuthorizedError('Você precisa estar logado!');
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

function notLoggedIn(errorMessage) {
  return (req, res, next) => {
    try {
      const token = req.cookies['jwt'];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY,
          (err, decoded) => {
            if (!(err instanceof jwt.TokenExpiredError)) {
              if (req.file) {
                /*
                Essa parte é pra filtrar se o user já ta logado no rota
                register tbm.
                Deixei assim porquê estava dando problema e a gente n
                necessariamente precisa esperar a imagem ser deletada pra
                responder (se achar algo pode me falar ou mudar)
                */
                unlink(
                  path.resolve(
                    __dirname,
                    '../../paper-dashboard-react/src/assets/img/entities/users',
                    req.file.filename),
                );
              }
              throw new NotAuthorizedError(errorMessage ||
                'Você já está logado no sistema!');
            }
          });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

function checkRole(roleArr) {
  return function(req, res, next) {
    try {
      if (roleArr.indexOf(req.user.role) !== -1) {
        next();
      } else {
        throw new NotAuthorizedError(
          'Você não tem permissão para realizar essa ação!');
      }
    } catch (error) {
      next(error);
    };
  };
}

module.exports = {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
};
