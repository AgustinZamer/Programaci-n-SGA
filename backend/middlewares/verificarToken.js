const jwt = require("jsonwebtoken")

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Acceso denegado: no se proporcionó un token válido"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decodificado
        next()
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        })
    }
}

module.exports = verificarToken