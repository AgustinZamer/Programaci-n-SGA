import { ListaAlumnos } from "./components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "./components/FormularioA"

function App()
{
const [actualizar, setActualizar] = useState(0)
function alumnoCreado() {
  setActualizar(valor => valor + 1)
}

return (
   <main>
   <FormularioA onAlumnoCreado={alumnoCreado}/>
   <ListaAlumnos actualizar={actualizar}/>
   </main>
  )
}
export default App