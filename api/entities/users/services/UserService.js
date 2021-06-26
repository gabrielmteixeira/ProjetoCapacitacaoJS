const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const bcrypt = require('bcrypt');
const {unlink} = require('fs').promises;
const {User} = require('../../../database/initializer');
const path = require('path');
const passwordToken = require('../../../redis/password-token');
const PasswordTokenError = require('../../../errors/PasswordTokenError');

class UserService {
  async createUser(user) {
    const bcryptSalt = 10;
    user.password = await bcrypt.hash(user.password, bcryptSalt);
    await User.create(user);
  }

  async getAll() {
    const users = await User.findAll();
    if (!users) {
      throw new EmptyDatabaseError(
        'Não existem entidades na tabela requisitada',
      );
    }

    return users;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({where: {email: email}});
    return user;
  }

  async updatePassword(userID, password) {
    const user = await User.findByPk(userID);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
    const PWDsAreEqual = await bcrypt.compare(password, user.password);
    if (PWDsAreEqual) {
      throw new InvalidParamError(
        'Sua nova senha deve ser diferente da sua anterior.');
    }
    const bcryptSalt = 10;
    const newPassword = await bcrypt.hash(passwrod, bcryptSalt);
    user.update({password: newPassword});
  }

  async updateRole(userID, role) {
    const user = await User.findByPk(userID);
    user.update({role});
    return user;
  }

  async resetPassword(token, newPassword) {
    const email = await passwordToken.getEmail(token);
    if (email) {
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      await User.update(
        {password: hashedNewPassword},
        {where: {email}},
      );

      await passwordToken.removeToken(token);
    } else {
      throw new PasswordTokenError('O token de reset não existe ou expirou!');
    }
  }

  async alterUser(id, body) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }

    await user.update(body);
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
    if (user.image != 'default-user-icon.png') {
      await unlink(
        path.resolve(
          __dirname,
          '../../../../paper-dashboard-react/src/assets/img/entities/users',
          user.image,
        ),
      );
    }
    await user.destroy();
  }
}

module.exports = new UserService();
