const {body} = require('express-validator');

module.exports = (method) => {
    switch (method) {
    case 'register': {
        return [
            body('email')
                .exists()
                .withMessage('É necessário preencher o campo "email".')
                .isEmail()
                .withMessage('O email inserido não é válido'),
            body('username')
                .exists()
                .withMessage('É necessário preencher o campo '+
                '"nome de usuário".')
                .isAlphanumeric()
                .withMessage('O nome de usuário inserido é inválido, ' +
                'o nome de usuário deve conter apenas letras e números.'),
            body('password')
                .exists()
                .withMessage('É necessário preencher o campo "senha".')
                .isStrongPassword()
                .withMessage('Sua senha deve conter pelo menos 8 caracteres, '+
                'com pelo menos um número, uma letra maiúscula e um caractér '+ 
                'especial'),
            body('name')
                .exists()
                .withMessage('É necessário preencher o campo "nome".')
                .isAlpha('pt-BR', {ignore: ' '})
                .withMessage('O nome deve conter apenas letras'),
            // body('role')
            body()
        ];
    }
    }
};
