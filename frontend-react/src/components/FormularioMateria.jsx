import { useState, useEffect } from "react";

const FormularioMateria = ({ materiaAEditar, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cargaHoraria: "",
    estado: "activa",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (materiaAEditar) {
      setFormData({
        codigo: materiaAEditar.codigo || "",
        nombre: materiaAEditar.nombre || "",
        descripcion: materiaAEditar.descripcion || "",
        cargaHoraria: materiaAEditar.cargaHoraria || "",
        estado: materiaAEditar.estado || "activa",
      });
    } else {
      setFormData({
        codigo: "",
        nombre: "",
        descripcion: "",
        cargaHoraria: "",
        estado: "activa",
      });
    }
  }, [materiaAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.codigo.trim() || /\s/.test(formData.codigo.trim())) {
      setError("El código es obligatorio y no debe contener espacios.");
      return;
    }
    if (!formData.nombre.trim()) {
      setError("El nombre de la materia es obligatorio.");
      return;
    }
    const horas = parseInt(formData.cargaHoraria, 10);
    if (isNaN(horas) || horas <= 0) {
      setError("La carga horaria debe ser un entero mayor a cero.");
      return;
    }

    onGuardar({
      ...formData,
      codigo: formData.codigo.trim().toUpperCase(),
      cargaHoraria: horas,
    });
  };

  return (
    <div className="formulario-materia-container">
      <h3>{materiaAEditar ? "Editar Materia" : "Registrar Nueva Materia"}</h3>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Código:</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            disabled={!!materiaAEditar}
            required
          />
        </div>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Carga Horaria:</label>
          <input
            type="number"
            name="cargaHoraria"
            value={formData.cargaHoraria}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>

        <button type="submit">
          {materiaAEditar ? "Guardar Cambios" : "Agregar Materia"}
        </button>

        {materiaAEditar && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default FormularioMateria;