const Materia = require('../models/Materia');

const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las materias', error: error.message });
    }
};

const obtenerMateriaPorCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        const materia = await Materia.findOne({ codigo: codigo.trim() });
        if (!materia) {
            return res.status(404).json({ mensaje: 'Materia no encontrada.' });
        }
        res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la materia', error: error.message });
    }
};

const crearMateria = async (req, res) => {
    try {
        const nuevaMateria = new Materia(req.body);
        const materiaGuardada = await nuevaMateria.save();
        res.status(201).json(materiaGuardada);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: 'Ya existe una materia registrada con ese código.' });
        }
        res.status(400).json({ mensaje: 'Error al registrar la materia', error: error.message });
    }
};

const actualizarMateria = async (req, res) => {
    try {
        const { codigo } = req.params;
        
        // Comprobar la existencia de la materia antes de modificarla
        const materiaExistente = await Materia.findOne({ codigo });
        if (!materiaExistente) {
            return res.status(404).json({ mensaje: 'No se puede modificar: Materia no encontrada.' });
        }

        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(materiaActualizada);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: 'El código ingresado ya pertenece a otra materia.' });
        }
        res.status(400).json({ mensaje: 'Error al actualizar la materia', error: error.message });
    }
};

const eliminarMateria = async (req, res) => {
    try {
        const { codigo } = req.params;
        
        const materiaEliminada = await Materia.findOneAndDelete({ codigo });
        if (!materiaEliminada) {
            return res.status(404).json({ mensaje: 'No se puede eliminar: Materia no encontrada.' });
        }

        res.status(200).json({ mensaje: 'Materia eliminada correctamente', materia: materiaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la materia', error: error.message });
    }
};

module.exports = {
    obtenerMaterias,
    obtenerMateriaPorCodigo,
    crearMateria,
    actualizarMateria,
    eliminarMateria
};