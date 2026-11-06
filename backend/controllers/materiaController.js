const Materia = require('../models/Materia');

exports.obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las materias', error: error.message });
  }
};

exports.obtenerMateriaPorCodigo = async (req, res) => {
  try {
    const materia = await Materia.findOne({ codigo: req.params.codigo.toUpperCase() });
    if (!materia) return res.status(404).json({ mensaje: 'Materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la materia', error: error.message });
  }
};

exports.crearMateria = async (req, res) => {
  try {
    const nuevaMateria = new Materia(req.body);
    await nuevaMateria.save();
    res.status(201).json(nuevaMateria);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'El código de la materia ya existe' });
    }
    res.status(400).json({ mensaje: 'Error al crear la materia', error: error.message });
  }
};

exports.actualizarMateria = async (req, res) => {
  try {
    const materia = await Materia.findOneAndUpdate(
      { codigo: req.params.codigo.toUpperCase() },
      req.body,
      { new: true, runValidators: true }
    );
    if (!materia) return res.status(404).json({ mensaje: 'Materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la materia', error: error.message });
  }
};

exports.eliminarMateria = async (req, res) => {
  try {
    const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo.toUpperCase() });
    if (!materia) return res.status(404).json({ mensaje: 'Materia no encontrada' });
    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la materia', error: error.message });
  }
};