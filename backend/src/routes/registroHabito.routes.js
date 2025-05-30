const express = require('express');
const router = express.Router();
const controller = require('../controllers/registroHabito.controller');

router.post('/', controller.crearRegistro);
router.get('/usuario/:usuarioId', controller.obtenerRegistrosPorUsuario);
router.put('/:id', controller.actualizarRegistro);
router.delete('/:id', controller.eliminarRegistro);

module.exports = router;