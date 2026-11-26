const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const Usuario = require("./models/Usuario")

async function crearUsuario() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    const email = "agustinzamer79@gmail.com"
    const password = "agustin"

    const hash = await bcrypt.hash(password, 10)

    const usuario = new Usuario({
      nombre: "Agustin Zamer",
      email: email,
      password: hash,
      rol: "admin"
    })
    await usuario.save()
    console.log("Usuario de prueba creado correctamente")
    console.log("Email:", email)
  } catch (error) {
    console.error("Error al crear el usuario: ", error.message)
  } finally {
    await mongoose.disconnect()
  }
}

crearUsuario()