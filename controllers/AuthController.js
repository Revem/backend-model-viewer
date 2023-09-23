const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class AuthController {

  // Registrar um novo usuário
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const fields = [
      {
        name: 'name',
        message: 'O campo nome é obrigatório!',
      },
      {
        name: 'email',
        message: 'O campo nome é obrigatório!',
      },
      {
        name: 'password',
        message: 'O campo nome é obrigatório!',
      },
      {
        name: 'confirmPassword',
        message: 'O campo nome é obrigatório!',
        validationParent: 'password',
      },
    ];

    //Validações
    fields.forEach((field) => {
      if (!req.body[field.name] || (field.validationParent && req.body[field.name] !== req.body[field.validationParent])) {
        return res.status(422).json({ message: field.message });
      };
    });

    const checkIfUserExists = await User.findOne({ where: { email } });

    if (checkIfUserExists) {
      return res.status(422).json({ message: 'E-mail já cadastrado, por gentileza, utilize outro e-mail.' });
    };

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword
    };

    try {
      const createdUser = await User.create(user);

      await createUserToken(createdUser, req, res);
    } catch (err) {
      res.status(500).json({ message: `Ocorreu um erro: ${err}` })
    };
  };

  // Função de Login
  static async login(req, res) {
    const { email, password } = req.body;
    const fields = [
      {
        name: 'email',
        message: 'O campo nome é obrigatório!',
      },
      {
        name: 'password',
        message: 'O campo nome é obrigatório!',
      },
    ];
    //Validação e-mail e senha
    fields.forEach((field) => {
      if (!req.body[field.name]) {
        return res.status(422).json({ message: field.message });
      };
    });
    //Checar se usuário existe
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado.' });
    };
    //Checar se as senhas batem com o banco de dados
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha invalida.' });
    };
    await createUserToken(user, req, res);
  };

  // Função de checar usuário
  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "#tokensecret@12vvhpp!");

      currentUser = await User.findByPk(decoded.id);

      currentUser.password = undefined;

    } else {
      currentUser = null;
    };

    res.status(200).send(currentUser);
  };

  // Função para encontrar um usuário no banco de dados utilizando o ID
  static async getUserById(req, res) {

    const { id } = req.params;
    const user = await User.findByPk(id);
    user.password = undefined;
    if (!user) {
      return res.status(422).json({
        message: 'Usuário não encontrado!',
      });
    };

    res.status(200).json({ user });
  };

  // Função para editar os dados de um usuário
  static async editUser(req, res) {
    const token = getToken(req);
    const user = getUserByToken(token);

    const { name, email } = req.body;

    // validações
    if (!name) {
      return res.status(422).json({ message: 'O campo nome é obrigatório!' });
    };

    if (!user) {
      return res.status(422).json({
        message: 'Usuário não encontrado!',
      });
    };

    if (!email) {
      return res.status(422).json({ message: 'O campo e-mail é obrigatório!' });
    }
    // Atualizar o nome do usuário
    user.name = name;

    //checar se o email já está em uso
    const userExists = await User.findOne({ where: { email: email } });

    if (user.email !== email && userExists) {
      return res.status(422).json({ message: 'E-mail já cadastrado, por gentileza, utilize outro e-mail.' });
    };
    // Atualizar o Email do usuário
    user.email = email;

    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  };
};