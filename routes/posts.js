const express = require('express');
const postsController = require('../controllers/PostController');
const checkAuthMiddleware = require('../middleware/check-auth');
// Cria um roteador do Express
const router = express.Router();

router.post('/', checkAuthMiddleware.checkAuth, postsController.save)
//router.post('/', postsController.save);
router.get('/:id', postsController.show);
router.get('/', postsController.index)
router.patch('/:id', postsController.update)
router.delete('/:id', postsController.destroy)
// Exporta o roteador para uso em outros arquivos
module.exports = router;
