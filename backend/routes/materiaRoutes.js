const express = require('express');
const router = express.Router();
const {
    obtenerMaterias,
    obtenerMateriaPorCodigo,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} = require('../controllers/materiaController');

router.get('/', obtenerMaterias);
router.get('/:codigo', obtenerMateriaPorCodigo);
router.post('/', crearMateria);
router.put('/:codigo', actualizarMateria);
router.delete('/:codigo', eliminarMateria);

module.exports = router;