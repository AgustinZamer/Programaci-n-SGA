export default function Navbar(){
    return (
        <nav className="mb-4">
            <a href="/">Inicio</a> |{" "}
            <a href="/alumnos">Alumnos</a> |{" "}
            <a href="/docentes">Docentes</a> |{" "}
            <a href="/materias">Materias</a>
        </nav>
    )
}