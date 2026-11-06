import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const API_MATERIAS = "http://localhost:3000/api/materias"

export default function ListaMaterias({ actualizar, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        async function cargarMaterias() {
            setCargando(true)
            setError("")
            try {
                const respuesta = await fetch(API_MATERIAS)
                if (!respuesta.ok) {
                    throw new Error(`No se pudo cargar la lista de materias. Estado HTTP: ${respuesta.status}`)
                }
                const datos = await respuesta.json()
                setMaterias(datos)
            } catch (err) {
                console.error("Error al cargar materias:", err)
                setError(err.message || "No se pudo conectar con el servidor")
            } finally {
                setCargando(false)
            }
        }
        cargarMaterias()
    }, [actualizar])

    async function eliminarMateria(codigo) {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) return
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${codigo}`, {
                method: "DELETE"
            })
            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar la materia")
            }
            onEditarMateria(null)
            window.location.reload()
        } catch (err) {
            console.error("Error al eliminar:", err)
            alert(err.message)
        }
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Materias
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {cargando ? (
                <Typography color="text.secondary">Cargando materias...</Typography>
            ) : materias.length === 0 ? (
                <Typography color="text.secondary">No hay materias registradas en el sistema.</Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {materias.map((materia) => (
                        <Paper
                            key={materia.codigo}
                            variant="outlined"
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderRadius: 2,
                                borderColor: "divider"
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    [{materia.codigo}] {materia.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {materia.descripcion} — <strong>{materia.cargaHoraria} hs</strong> ({materia.estado})
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onEditarMateria(materia)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => eliminarMateria(materia.codigo)}
                                >
                                    Eliminar
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Paper>
    )
}