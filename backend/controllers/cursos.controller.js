const Curso = require("../models/Curso")

async function obtenerCursos(req, res) {
    const cursos = await Curso.find()
    res.json(cursos)
}

async function obtenerCurso(req, res) {
    const codigo = String(req.params.codigo || req.params.id || "").trim().toUpperCase()
    const curso = await Curso.findOne({ codigo })
    if (!curso) {
        return res.status(404).json({
            mensaje: "Curso no encontrado"
        })
    }
    res.json(curso)
}

async function crearCurso(req, res) {
    const { codigo, nombre, descripcion, duracion } = req.body
    if (!codigo || !nombre || !descripcion || duracion === undefined || duracion === null || duracion === "") {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }
    if (typeof codigo !== "string" || typeof nombre !== "string" || typeof descripcion !== "string") {
        return res.status(400).json({
            mensaje: "El código, nombre y descripción deben ser texto"
        })
    }
    if (typeof duracion !== "number" || Number.isNaN(duracion)) {
        return res.status(400).json({
            mensaje: "La duración debe ser un número"
        })
    }

    const codigoNormalizado = codigo.trim().toUpperCase()
    const existe = await Curso.findOne({ codigo: codigoNormalizado })
    if (existe) {
        return res.status(400).json({
            mensaje: "El código de curso ya existe"
        })
    }

    const nuevoCurso = await Curso.create({
        codigo: codigoNormalizado,
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        duracion
    })
    res.status(201).json(nuevoCurso)
}

async function actualizarCurso(req, res) {
    const codigoParam = String(req.params.codigo || req.params.id || "").trim().toUpperCase()
    const { codigo, nombre, descripcion, duracion } = req.body

    if (duracion !== undefined && (typeof duracion !== "number" || Number.isNaN(duracion))) {
        return res.status(400).json({
            mensaje: "La duración debe ser un número"
        })
    }

    const datosActualizar = {}
    if (codigo !== undefined) datosActualizar.codigo = String(codigo).trim().toUpperCase()
    if (nombre !== undefined) datosActualizar.nombre = String(nombre).trim()
    if (descripcion !== undefined) datosActualizar.descripcion = String(descripcion).trim()
    if (duracion !== undefined) datosActualizar.duracion = duracion

    const curso = await Curso.findOneAndUpdate(
        { codigo: codigoParam },
        datosActualizar,
        { returnDocument: "after", runValidators: true }
    )
    if (!curso) {
        return res.status(404).json({
            mensaje: "Curso no encontrado"
        })
    }

    res.json(curso)
}

async function eliminarCurso(req, res) {
    const codigoParam = String(req.params.codigo || req.params.id || "").trim().toUpperCase()
    const curso = await Curso.findOneAndDelete({ codigo: codigoParam })
    if (!curso) {
        return res.status(404).json({
            mensaje: "Curso no encontrado"
        })
    }

    res.json({ mensaje: "Curso eliminado correctamente" })
}

module.exports = {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}