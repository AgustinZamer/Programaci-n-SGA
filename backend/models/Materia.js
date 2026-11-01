const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'El código de la materia es obligatorio.'],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return v && v.trim().length > 0 && !/\s/.test(v);
            },
            message: 'El código no puede estar vacío ni contener espacios.'
        }
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la materia es obligatorio.'],
        trim: true,
        minlength: [2, 'El nombre debe tener una longitud razonable.']
    },
    descripcion: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (v === undefined || v === null || v === '') return true;
                return v.trim().length > 0;
            },
            message: 'La descripción no puede contener únicamente espacios.'
        }
    },
    cargaHoraria: {
        type: Number,
        required: [true, 'La carga horaria es obligatoria.'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v) && v > 0;
            },
            message: 'La carga horaria debe ser un número entero mayor que cero.'
        }
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio.'],
        enum: {
            values: ['activa', 'inactiva'],
            message: 'El estado debe ser "activa" o "inactiva".'
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Materia', materiaSchema);