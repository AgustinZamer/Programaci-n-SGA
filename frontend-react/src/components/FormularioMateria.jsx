import { useState, useEffect } from "react"
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"

const API_MATERIAS = "http://localhost:3000/api/materias"

export default function FormularioMateria({ onMateriaCreada, materiaEditar, onCancelar }) {
    const [formulario, setFormulario] = useState({
        codigo: String(materiaEditar?.codigo ?? "PRG4"),
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "Activa"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (materiaEditar) {
            setFormulario({
                codigo: String(materiaEditar.codigo ?? ""),
                nombre: materiaEditar.nombre ?? "",
                descripcion: materiaEditar.descripcion ?? "",
                cargaHoraria: String(materiaEditar.cargaHoraria ?? ""),
                estado: materiaEditar.estado ?? "Activa"
            })
        } else {
            setFormulario({
                codigo: "PRG4",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: "Activa"
            })
        }
    }, [materiaEditar])

    function manejarCambio(e) {
        const { name, value } = e.target
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)

        const materia = {
            ...formulario,
            cargaHoraria: Number(formulario.cargaHoraria)
        }

        const editando = Boolean(materiaEditar)
        const url = editando 
            ? `${API_MATERIAS}/${materiaEditar.codigo}` 
            : API_MATERIAS

        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(materia)
            })

            const resultado = await respuesta.json()

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: "Activa"
            })
            if (onMateriaCreada) onMateriaCreada()
        } catch (err) {
            console.error("Error al guardar:", err)
            setError(err.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }

    function cancelar() {
        if (onCancelar) onCancelar()
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
                {materiaEditar ? "Editar Materia" : "Nueva Materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
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
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    disabled
                    required
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga Horaria (Hs)"
                    type="number"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    select
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="Activa">Activa</MenuItem>
                    <MenuItem value="Inactiva">Inactiva</MenuItem>
                </TextField>
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    multiline
                    rows={2}
                    required
                    fullWidth
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
                        {guardando
                            ? "Guardando..."
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
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