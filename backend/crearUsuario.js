const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const Usuario = require("./models/Usuario")

async function crearUsuario() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const usuarios = [
      {
        nombre: "Agustin Zamer",
        email: "agustinzamer79@gmail.com",
        password: await bcrypt.hash("agustin", 10),
        rol: "admin"
      },
      {
        nombre: "Usuario Consulta",
        email: "consulta@sga.com",
        password: await bcrypt.hash("claveUsuario123", 10),
        rol: "usuario"
      },
      {
        nombre: "Administrador SGA",
        email: "admin@sga.com",
        password: await bcrypt.hash("claveAdmin123", 10),
        rol: "admin"
      }
    ]

    for (const data of usuarios) {
      const existe = await Usuario.findOne({ email: data.email })
      if (!existe) {
        await new Usuario(data).save()
        console.log(`Usuario creado: ${data.email} (${data.rol})`)
      } else {
        console.log(`El usuario ya existe: ${data.email}`)
      }
    }
  } catch (error) {
    console.error("Error al crear el usuario:", error.message)
  } finally {
    await mongoose.disconnect()
  }
}

crearUsuario()