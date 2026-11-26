import { useState, useEffect } from "react"
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material"

const API_URL = "http://localhost:3000/api/cursos"

export default function FormularioCurso({ onCursoCreado, cursoEditar, onCancelar }) {
    const [codigo, setCodigo] = useState(cursoEditar?.codigo ?? "")
    const [nombre, setNombre] = useState(cursoEditar?.nombre ?? "")
    const [descripcion, setDescripcion] = useState(cursoEditar?.descripcion ?? "")
    const [duracion, setDuracion] = useState(cursoEditar?.duracion ?? "")
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    const esEdicion = Boolean(cursoEditar)

    useEffect(() => {
        if (cursoEditar) {
            setCodigo(String(cursoEditar.codigo ?? ""))
            setNombre(cursoEditar.nombre ?? "")
            setDescripcion(cursoEditar.descripcion ?? "")
            setDuracion(String(cursoEditar.duracion ?? ""))
        } else {
            setCodigo("")
            setNombre("")
            setDescripcion("")
            setDuracion("")
        }
    }, [cursoEditar])

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        const duracionNumero = Number(duracion)
        if (!codigo.trim() || !nombre.trim() || !descripcion.trim() || Number.isNaN(duracionNumero) || duracionNumero <= 0) {
            setError("Completá código, nombre, descripción y una duración numérica válida.")
            return
        }

        const payload = {
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            duracion: duracionNumero
        }

        const url = esEdicion
            ? `${API_URL}/${encodeURIComponent(cursoEditar.codigo)}`
            : API_URL
        const method = esEdicion ? "PUT" : "POST"

        try {
            setGuardando(true)
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data.mensaje || "No se pudo guardar el curso.")
                return
            }

            if (!esEdicion) {
                setCodigo("")
                setNombre("")
                setDescripcion("")
                setDuracion("")
            }
            onCursoCreado?.()
        } catch {
            setError("Error de conexión con el servidor.")
        } finally {
            setGuardando(false)
        }
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {esEdicion ? `Editar Curso (${cursoEditar.codigo})` : "Nuevo Curso"}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    placeholder="CUR001"
                    disabled={esEdicion || guardando}
                    fullWidth
                    required
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Programación Web"
                    disabled={guardando}
                    fullWidth
                    required
                />
                <TextField
                    id="duracion"
                    name="duracion"
                    label="Duración (Horas)"
                    type="number"
                    value={duracion}
                    onChange={e => setDuracion(e.target.value)}
                    placeholder="64"
                    disabled={guardando}
                    fullWidth
                    required
                />
                <Box sx={{ display: { xs: "none", sm: "block" } }} />
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Desarrollo de aplicaciones web"
                    multiline
                    rows={2}
                    disabled={guardando}
                    fullWidth
                    required
                    sx={{ gridColumn: "1 / -1" }}
                />

                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Guardar"}
                    </Button>
                    {esEdicion && (
                        <Button
                            type="button"
                            onClick={onCancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>

                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}