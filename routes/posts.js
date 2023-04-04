// Importa o módulo express para criar um roteador
const express = require('express');

// Importa o controller PostController
const postsController = require('../controllers/PostController');

// Cria um roteador do Express
const router = express.Router();

// Define a rota '/' para chamar a função index do PostController
//router.get('/', postsController.save);
router.post('/', postsController.save);
router.get('/:id', postsController.show);
router.get('/', postsController.index)
router.patch('/:id', postsController.update)
router.delete('/:id', postsController.destroy)
// Exporta o roteador para uso em outros arquivos
module.exports = router;
