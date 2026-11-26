const mongoose = require("mongoose")

const cursoSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            required: true,
            trim: true
        },
        duracion: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Curso", cursoSchema)