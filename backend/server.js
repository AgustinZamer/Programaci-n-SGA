require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/database");
const alumnosRoutes = require("./routes/alumnos.routes");
const docentesRoutes = require("./routes/docentes.routes");
const materiaRoutes = require("./routes/materiaRoutes");
const usuariosRoutes = require("./routes/usuarios.routes");
const cursosRoutes = require("./routes/cursos.routes");

const app = express(); 

app.use(express.json());
app.use(cors());

app.use("/api/alumnos", alumnosRoutes);
app.use("/api/docentes", docentesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/cursos", cursosRoutes);

const PORT = process.env.PORT || 5000; 

conectarDB(); 

console.log("Ejecutado con nodemon");

app.listen(PORT, () => { 
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

