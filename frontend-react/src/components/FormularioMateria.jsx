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
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">
        {materiaAEditar ? "Editar Materia" : "Registrar Nueva Materia"}
      </h2>

      {error && (
        <div className="p-3 mb-4 rounded-lg bg-red-900/50 border border-red-700 text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Código *</label>
            <input
              type="text"
              name="codigo"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
              value={formData.codigo}
              onChange={handleChange}
              disabled={!!materiaAEditar}
              placeholder="Ej: PRG4"
              required
            />
          </div>

          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Programación IV"
              required
            />
          </div>

          <div className="md:col-span-12">
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción general de la asignatura"
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Carga Horaria (Hs) *</label>
            <input
              type="number"
              name="cargaHoraria"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.cargaHoraria}
              onChange={handleChange}
              placeholder="Ej: 90"
              min="1"
              required
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Estado:</label>
            <select
              name="estado"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {materiaAEditar ? "Guardar Cambios" : "Agregar Materia"}
          </button>
          {materiaAEditar && (
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioMateria;