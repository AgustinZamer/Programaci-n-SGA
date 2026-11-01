const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt")

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        return res.status(200).json(usuarios)
    } catch (error) {
        console.error("Error al obtener usuarios: ", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: "Faltan campos obligatorios (nombre, email, password)"
            })
        }

        const emailNormalizado = email.trim().toLowerCase()
        const usuarioExistente = await Usuario.findOne({ email: emailNormalizado })

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El email ya se encuentra registrado"
            })
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const nuevoUsuario = new Usuario({
            nombre,
            email: emailNormalizado,
            password: passwordHash,
            rol
        })

        await nuevoUsuario.save()

        return res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        })
    } catch (error) {
        console.error("Error al crear usuario: ", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debés ingresar email y contraseña"
            })
        }

        const usuario = await Usuario.findOne({ 
            email: email.trim().toLowerCase() 
        }).select("+password")

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        const coincide = await bcrypt.compare(password, usuario.password)

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        return res.status(200).json({
            mensaje: "Login correcto",
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        })
    } catch (error) {
        console.error("Error en login: ", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    login
}