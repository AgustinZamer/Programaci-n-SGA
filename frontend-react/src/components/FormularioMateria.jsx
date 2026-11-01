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
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {materiaAEditar ? "Editar Materia" : "Registrar Nueva Materia"}
        </h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label font-weight-bold">Código:</label>
              <input
                type="text"
                name="codigo"
                className="form-control"
                value={formData.codigo}
                onChange={handleChange}
                disabled={!!materiaAEditar}
                placeholder="Ej: PRG4"
                required
              />
            </div>

            <div className="col-md-8">
              <label className="form-label font-weight-bold">Nombre:</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Programación IV"
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label font-weight-bold">Descripción:</label>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción general de la asignatura"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label font-weight-bold">Carga Horaria (Hs):</label>
              <input
                type="number"
                name="cargaHoraria"
                className="form-control"
                value={formData.cargaHoraria}
                onChange={handleChange}
                placeholder="Ej: 90"
                min="1"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label font-weight-bold">Estado:</label>
              <select
                name="estado"
                className="form-select"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {materiaAEditar ? "Guardar Cambios" : "Agregar Materia"}
            </button>
            {materiaAEditar && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancelar}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioMateria;