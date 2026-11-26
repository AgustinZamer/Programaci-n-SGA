import { useState } from "react"
import FormularioCurso from "../components/FormularioCursos"
import ListaCursos from "../components/ListaCursos"

export default function Cursos() {
    const [actualizar, setActualizar] = useState(0)
    const [cursoEditar, setCursoEditar] = useState(null)

    function cursoCreado() {
        setActualizar(valor => valor + 1)
        setCursoEditar(null)
    }

    return (
        <>
            <FormularioCurso
                key={cursoEditar?.codigo ?? "nuevo"}
                onCursoCreado={cursoCreado}
                cursoEditar={cursoEditar}
                onCancelar={() => setCursoEditar(null)}
            />
            <ListaCursos
                actualizar={actualizar}
                onEditarCurso={setCursoEditar}
            />
        </>
    )
}