const express = require('express');
const router = express.Router();

//Rota que utilizo para verificar se a API está funcionando.
router.get('/health',
  (req, res) => {
    res.status(200).json({ message: 'Success!' });
  },
);

module.exports = router;