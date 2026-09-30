import Titulo from "./components/Titulo"
import {Navbar} from "./components/Navbar"
import {Footer} from "./components/Footer"
import TarjetaAlumno from "./components/TarjetaAlumno"

function App()
{
  return (
    <>
    <Navbar />
    <Titulo texto="Sistema de Gestión Académica" color="magenta" />
    <h2>Administración de Alumnos</h2>
    <TarjetaAlumno 
    nombre="Ana López"
    carrera="Programación" 
    edad="20"
    />
    <br />
    <TarjetaAlumno 
    nombre="Juan Pérez"
    carrera="Tecnicatura en sistemas" 
    edad="23"
    />
    <br />
    <Footer />
    </>
  )
}
export default App