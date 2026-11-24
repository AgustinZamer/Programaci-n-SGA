import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="mb-4">
            <Link to="/">Inicio</Link> |{" "}
            <Link to="/alumnos">Alumnos</Link> |{" "}
            <Link to="/docentes">Docentes</Link> |{" "}
            <Link to="/materias">Materias</Link>
        </nav>
    )
}