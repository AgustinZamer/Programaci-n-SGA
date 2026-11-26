const express = require("express")
const router = express.Router()
const {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} = require("../controllers/cursos.controller")


router.get("/", obtenerCursos)
router.get("/:codigo", obtenerCurso)
router.post("/", crearCurso)
router.put("/:codigo", actualizarCurso)
router.delete("/:codigo", eliminarCurso)

module.exports = router