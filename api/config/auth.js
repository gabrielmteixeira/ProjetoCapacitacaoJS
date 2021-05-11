const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../entities/users/models/Users');
const bcrypt = require('bcrypt');

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
          // todo: customError
          throw new Error('Email não cadastrado');
        }

        const matchingPassword = await bcrypt.compare(password, user.password);

        if (!matchingPassword) {
          throw new Error('E-mail e/ou senha incorretos!');
        }

        done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
