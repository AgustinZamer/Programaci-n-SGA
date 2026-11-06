const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true,
        uppercase: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    cargaHoraria: {
        type: Number,
        required: [true, 'La carga horaria es obligatoria']
    },
    estado: {
        type: String,
        required: true,
        default: 'Activa'
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    }
});

module.exports = mongoose.model('Materia', materiaSchema);