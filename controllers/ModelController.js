const Model = require('../models/Model')

// helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class ModelController {
  static async create(req, res) {
    const { name } = req.body

    // validação
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
    }

    if (!req.file) {
      res.json({ message: 'É necessário enviar um arquivo GLB!' })
    }
    // Encontrar dono do Modelo
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Criar um Modelo
    const model = new Model({
      name,
      glb: req.file.filename,
      UserId: user.id
    })



    try {
      const newModel = await model.save()
      res.status(201).json({
        message: 'Modelo cadastrado com sucesso!',
        newModel
      })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static async getAll(req, res) {
    const models = await Model.findAll()
    res.status(200).json({
      models: models,
    })
  }
  static async getAllUserModels(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const models = await Model.findAll({ where: { userId: user.id } })

    res.status(200).json({
      models
    })
  }

  static async getModelById(req, res) {
    const id = req.params.id

    const model = await Model.findByPk(id)

    if (!model) {
      res.status(404).json({ message: 'Modelo não existe!' })
    }

    res.status(200).json({
      model: model
    })
  }

  static async removeModelById(req, res) {
    try {
      const model = await Model.findOne({ where: { id: req.params.id } });


      // Verificando se o modelo foi encontrado
      if (!model) {
        return res.status(404).json({ message: 'Modelo não existe!' });
      }

      const token = getToken(req);
      const user = await getUserByToken(token);


      // Verificando se o modelo pertence ao usuário atual
      if (!model.UserId || model.UserId !== user.id) {
        return res.status(403).json({ message: 'Você não tem permissão para excluir este modelo!' });
      }
      //excluindo modelo do banco de dados
      await model.destroy();

      res.status(200).json({ message: "Modelo deletado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async updateModel(req, res) {
    const id = req.params.id
    const { name } = req.body
    const file = req.file
    const model = await Model.findOne({ where: { id } });
    if (!model) {
      res.status(404).json({ message: 'Modelo não encontrado!' })
    }

    if (file) {
      const fileName = req.file.filename
      model.glb = fileName
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    console.log("requisição abaixo:")
    console.log(req.body)

    // Verificando se o modelo pertence ao usuário atual
    if (!model.UserId || model.UserId !== user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este modelo!' });
    }
    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!' })
    }
    model.name = name
    await model.save()
    return res.status(200).json({ message: 'Modelo atualizado com sucesso!' })
  }
}