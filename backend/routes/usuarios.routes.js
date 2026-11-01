const express = require("express")
const {
  obtenerUsuarios,
  crearUsuario,
  login
} = require("../controllers/authController")

const router = express.Router()

router.get("/", obtenerUsuarios)
router.post("/", crearUsuario)
router.post("/login", login)

module.exports = router