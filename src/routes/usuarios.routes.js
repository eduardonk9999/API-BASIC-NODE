const { Router } = require('express');
const usuariosController = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosController.listar);
router.get('/:id', usuariosController.buscarPorId);
router.post('/', usuariosController.criar);
router.put('/:id', usuariosController.substituir);
router.patch('/:id', usuariosController.atualizar);
router.delete('/:id', usuariosController.excluir);

module.exports = router;
