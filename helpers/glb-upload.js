const multer = require('multer')
const path = require('path')

const modelStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "models"
    cb(null, `public/${folder}`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const modelUpload = multer({
  storage: modelStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(glb)$/)) {
      return cb(new Error("Por gentileza, envie apenas modelos com extensão .glb!"))
    }
    cb(undefined, true)
  }
})

module.exports = { modelUpload }