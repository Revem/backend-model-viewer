const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

  //Criar Token
  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, "#tokensecret@12vvhpp!")

  //Retornar Token
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userId: user.id
  })

}

module.exports = createUserToken