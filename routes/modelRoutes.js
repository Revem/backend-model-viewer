const express = require('express')
const router = express.Router()
const ModelController = require('../controllers/ModelController')

// middleware
const verifyToken = require('../helpers/verify-token')
const { modelUpload } = require('../helpers/glb-upload')

router.post('/create', verifyToken, modelUpload.single('file'), ModelController.create)
router.get('/getall', ModelController.getAll)
router.get('/mymodels', verifyToken, ModelController.getAllUserModels)
router.get('/:id', ModelController.getModelById)
router.patch('/:id', verifyToken, modelUpload.single('file'), ModelController.updateModel)
router.delete('/:id', verifyToken, ModelController.removeModelById)

module.exports = router