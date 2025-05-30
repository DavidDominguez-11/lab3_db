const express = require('express');
const router = express.Router();
const controller = require('../controllers/participacionReto.controller');

router.post('/', controller.unirseReto);
router.get('/reto/:retoId', controller.obtenerParticipacionesPorReto);
router.put('/:id', controller.marcarCompletado);
router.delete('/:id', controller.abandonarReto);

module.exports = router;