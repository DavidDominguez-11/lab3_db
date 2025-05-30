const express = require('express');
const router = express.Router();
const vistasController = require('../controllers/vistas.controller');

router.get('/registro-habitos', vistasController.obtenerVistaRegistroHabitos);
router.get('/participacion-retos', vistasController.obtenerVistaParticipacionRetos);

module.exports = router;
