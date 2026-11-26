import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const API_URL = "http://localhost:3000/api/cursos"

export default function ListaCursos({ actualizar, onEditarCurso }) {
    const [cursos, setCursos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function cargarCursos() {
        try {
            setCargando(true)
            setError("")
            const res = await fetch(API_URL)
            if (!res.ok) {
                throw new Error(`No se pudo cargar la lista de cursos. Estado HTTP: ${res.status}`)
            }
            const datos = await res.json()
            setCursos(Array.isArray(datos) ? datos : [])
        } catch (err) {
            console.error("Error al cargar cursos:", err)
            setError(err.message || "No se pudo conectar con el servidor.")
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarCursos()
    }, [actualizar])

    async function eliminarCurso(codigo) {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este curso?")) return

        try {
            setError("")
            const res = await fetch(`${API_URL}/${encodeURIComponent(codigo)}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                throw new Error("No se pudo eliminar el curso.")
            }
            setCursos((prev) => prev.filter((c) => c.codigo !== codigo))
            if (onEditarCurso) onEditarCurso(null)
        } catch (err) {
            console.error("Error al eliminar:", err)
            setError(err.message || "Error de conexión al eliminar el curso.")
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
                Cursos
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {cargando ? (
                <Typography color="text.secondary">Cargando cursos...</Typography>
            ) : cursos.length === 0 ? (
                <Typography color="text.secondary">No hay cursos registrados en el sistema.</Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {cursos.map((curso) => (
                        <Paper
                            key={curso._id ?? curso.codigo}
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
                                    [{curso.codigo}] {curso.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {curso.descripcion} — <strong>{curso.duracion} hs</strong>
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onEditarCurso?.(curso)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => eliminarCurso(curso.codigo)}
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