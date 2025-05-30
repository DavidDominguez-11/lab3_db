const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habito.controller');

router.get('/', habitoController.obtenerHabitos);
router.get('/:id', habitoController.obtenerHabitoPorId);
router.post('/', habitoController.crearHabito);
router.put('/:id', habitoController.actualizarHabito);
router.delete('/:id', habitoController.eliminarHabito);

module.exports = router;