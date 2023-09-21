const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class AuthController {

  // Registrar um novo usuário
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body

    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'O campo senha é obrigatório!' })
      return
    }
    if (!confirmPassword) {
      res.status(422).json({ message: 'O campo confirmar senha é obrigatório!' })
      return
    }
    if (password != confirmPassword) {
      res.status(422).json({ message: 'Senha não confere, tente novamente!' })
      return
    }
    const checkIfUserExists = await User.findOne({ where: { email: email } })
    if (checkIfUserExists) {
      res.status(422).json({ message: 'E-mail já cadastrado, por gentileza, utilize outro e-mail.' })
      return
    }

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword
    }

    try {
      const createdUser = await User.create(user)

      await createUserToken(createdUser, req, res)
    } catch (err) {
      res.status(500).json({ message: `Ocorreu um erro: ${err}` })
    }
  }
  // Função de Login
  static async login(req, res) {
    const { email, password } = req.body
    //Campo email necessário!
    if (!email) {
      return res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
    }
    //Campo senha necessário!
    if (!password) {
      return res.status(422).json({ message: 'O campo senha é obrigatório!' })
    }
    //Checar se usuário existe
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado.' })
    }
    //Checar se as senhas batem com o banco de dados
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha invalida.' })
    }
    await createUserToken(user, req, res)
  }
  // Função de checar usuário
  static async checkUser(req, res) {
    let currentUser

    console.log(req.headers.authorization)

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, "#tokensecret@12vvhpp!")

      currentUser = await User.findByPk(decoded.id)

      currentUser.password = undefined

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }
  // Função para encontrar um usuário no banco de dados utilizando o ID
  static async getUserById(req, res) {

    const id = req.params.id
    const user = await User.findByPk(id)
    user.password = undefined
    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado!'
      })
      return
    }

    res.status(200).json({ user })
  }
  // Função para editar os dados de um usuário
  static async editUser(req, res) {
    const token = getToken(req)
    const user = getUserByToken(token)

    const { name, email } = req.body

    // validações
    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatório!' })
      return
    }
    // Atualizar o nome do usuário
    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
      return
    }

    //checar se o email já está em uso
    const userExists = await User.findOne({ where: { email: email } })

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'E-mail já cadastrado, por gentileza, utilize outro e-mail.' })
      return
    }
    // Atualizar o Email do usuário
    user.email = email


    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado!'
      })
      return
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' })

  }
}