import { useEffect, useState } from "react"

function App()
{
const [nombre, setNombre] = useState("")

useEffect(() => {
  if (nombre){
    document.title = `Hola ${nombre}`
  } else {
    document.title = `Mi aplicación`
    }
}, [nombre])

return (
   <>
  <input 
  value = {nombre}
  onChange={(e) => setNombre(e.target.value)}
  placeholder="Escribí tu nombre"
  />
  <h2>Hola {nombre} </h2>
   </>
  )
}
export default App