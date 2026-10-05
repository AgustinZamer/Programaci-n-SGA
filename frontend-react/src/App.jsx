import Incrementar from "./components/ejemplos/Incrementar"
import CambiarTitulo from "./components/ejemplos/CambiarTitulo"
import { Adivina } from "./components/ejemplos/Adivina"
import Mensaje from "./components/ejemplos/Mensaje"
import TamanioTexto from "./components/ejemplos/TamanioTexto"

function App()
{
  return (
    <>
    <TamanioTexto />
    <br />
    <Mensaje />
    <Incrementar />
    <br />
    <CambiarTitulo />
    <br />
    <Adivina />
    </>
  )
}
export default App