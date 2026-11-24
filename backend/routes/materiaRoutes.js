const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const {
    obtenerMaterias,
    obtenerMateriaPorCodigo,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} = require('../controllers/materiaController');

router.use(verificarToken);

router.get('/', obtenerMaterias);
router.get('/:codigo', obtenerMateriaPorCodigo);
router.post('/', crearMateria);
router.put('/:codigo', actualizarMateria);
router.delete('/:codigo', eliminarMateria);

module.exports = router;