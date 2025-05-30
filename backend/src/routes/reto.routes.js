const express = require('express');
const router = express.Router();
const retoController = require('../controllers/reto.controller');

router.get('/', retoController.obtenerRetos);
router.get('/:id', retoController.obtenerRetoPorId);
router.post('/', retoController.crearReto);
router.put('/:id', retoController.actualizarReto);
router.delete('/:id', retoController.eliminarReto);

module.exports = router;