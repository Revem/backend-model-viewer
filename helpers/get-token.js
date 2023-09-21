
// Função de receber token do usuário para verificações.
const getToken = (req) => {

  const authHeader = req.headers.authorization
  const token = authHeader.split(" ")[1]

  return token
}

module.exports = getToken