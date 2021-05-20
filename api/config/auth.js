const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../entities/users/models/Users');
const bcrypt = require('bcrypt');
const InvalidParamError = require('../errors/InvalidParamError');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
          throw new InvalidParamError('Email não cadastrado');
        }

        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
          throw new InvalidParamError('Senha incorreta');
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: cookieExtractor,
    },
    // TODO: Implementar blacklist (logout)
    (jwtPayload, done) => {
      try {
        return done(null, jwtPayload.user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
