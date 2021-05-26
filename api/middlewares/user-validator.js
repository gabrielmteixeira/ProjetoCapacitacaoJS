const InvalidParamError = require('../errors/InvalidParamError');
const {body} = require('express-validator');
const {validate} = require('./validate');
const {User} = require('../database/initializer');
const bcrypt = require('bcrypt');

// TODO: Acabar os body validators

const getValidations = (method) => {
  switch (method) {
  case 'registerUser': {
    return [
      // Aqui no email e tbm no username se quisermos podemos já fazer a
      // checagem no banco e vermos se o email/username ja esta registrado
      // OBS: Não tenho 100% de ctz que isso da certo por motivos de n da pra
      // testar
      body('email')
        .exists()
        .withMessage('É necessário preencher o campo "email".')
        .isEmail()
        .withMessage('O email inserido não é válido')
        .custom((value)=> {
          return User.findOne({where: {email: value}})
            .then((user)=> {
              if (user) {
                return Promise.reject(
                  new InvalidParamError('O email inserido já está em uso.'));
              }
              return Promise.resolve();
            });
        }),
      body('username')
        .exists()
        .withMessage('É necessário preencher o campo "nome de usuário".')
        .isAlphanumeric()
        .withMessage(
          'O nome de usuário inserido é inválido, ' +
          'o nome de usuário deve conter apenas letras e números.',
        )
        .custom((value)=> {
          return User.findOne({where: {username: value}})
            .then((user)=> {
              if (user) {
                return Promise.reject(
                  new InvalidParamError(
                    'O nome de usuário inserido ja está em uso.'));
              }
              return Promise.resolve();
            });
        }),
      body('password')
        .exists()
        .withMessage('É necessário preencher o campo "senha".')
        .isStrongPassword()
        .withMessage(
          'Sua senha deve conter pelo menos 8 caracteres, ' +
            'com pelo menos um número, uma letra maiúscula e um caractér ' +
            'especial',
        )
        .custom((value, {req}) => {
          if (value != req.body.passwordConfirmation) {
            return Promise.reject(
              new InvalidParamError(
                'Senha e confirmação de senha não coincidem.'));
          }
          return Promise.resolve();
        }),
      body('name')
        .exists()
        .withMessage('É necessário preencher o campo "nome".')
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage('O nome deve conter apenas letras'),
      /*
      body('birthday')
        .exists()
        .withMessage('É necessário preencher o campo "data de nascimento"')
        .isAfter()
        .withMessage(
          'A data de nascimento é inválida, até onde sei você não pode ter ' +
            'vindo do futuro'),
      */
    ];
  }
  case 'login': {
    return [
      body('email')
        .exists()
        .withMessage('Por favor insira um email!')
        .isEmail()
        .withMessage('Por favor insira um email válido!'),
      body('password')
        .exists()
        .withMessage('Por favor insira uma senha')
        .notEmpty()
        .withMessage('Por favor insira uma senha'),
    ];
  }
  case 'changePassword': {
    return [
      body('oldPassword')
        .exists()
        .withMessage('Por favor, insira sua antiga senha')
        .custom(async (value, {req}) => {
          const userID = req.user.id;
          const user = User.findByPk(userID);
          const oldPassword = user.password;
          const passwordMatch = await bcrypt.compare(value, oldPassword);
          if (!passwordMatch) {
            return Promise.reject(
              new InvalidParamError('Insira sua senha antiga corretamente'));
          };
          return Promise.resolve();
        }),
      body('newPassword')
        .exists()
        .withMessage('É necessário preencher o campo "senha".')
        .isStrongPassword()
        .withMessage(
          'Sua senha deve conter pelo menos 8 caracteres, ' +
            'com pelo menos um número, uma letra maiúscula e um caractér ' +
            'especial',
        )
        .custom((value, {req}) => {
          if (value !== req.body.passwordConfirmation) {
            return Promise.reject(
              new InvalidParamError(
                'Senha e confirmação de senha não coincidem.'));
          }
          return Promise.resolve();
        }),
    ];
  }
  case 'teste': {
    return [
      body('teste')
        .exists()
        .withMessage('Campo teste não existe')
        .isEmail()
        .withMessage('Não é um email'),
    ];
  }
  }
};

module.exports = {
  userValidate: (method) => validate(getValidations(method), 'user'),
};

