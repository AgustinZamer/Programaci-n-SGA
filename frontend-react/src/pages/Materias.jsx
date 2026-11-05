import { useState, useEffect } from "react";
import FormularioMateria from "../components/FormularioMateria";
import ListaMaterias from "../components/ListaMaterias";

const API_URL = "http://localhost:3000/materias";

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiaAEditar, setMateriaAEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const cargarMaterias = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setMaterias(data);
      }
    } catch (error) {
      console.error("Error al obtener las materias:", error);
      mostrarMensaje("Error al conectar con el servidor", "danger");
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  const mostrarMensaje = (texto, tipo = "success") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  const handleGuardar = async (materiaData) => {
    try {
      if (materiaAEditar) {
        const res = await fetch(`${API_URL}/${materiaAEditar.codigo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(materiaData),
        });

        const data = await res.json();

        if (res.ok) {
          mostrarMensaje("Materia actualizada exitosamente");
          setMateriaAEditar(null);
          cargarMaterias();
        } else {
          mostrarMensaje(data.mensaje || "Error al actualizar", "danger");
        }
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(materiaData),
        });

        const data = await res.json();

        if (res.ok) {
          mostrarMensaje("Materia registrada exitosamente");
          cargarMaterias();
        } else {
          mostrarMensaje(data.mensaje || "Error al crear la materia", "danger");
        }
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      mostrarMensaje("Error de comunicación con la API", "danger");
    }
  };

  const handleEliminar = async (codigo) => {
    if (!window.confirm(`¿Estás seguro de eliminar la materia ${codigo}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${codigo}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        mostrarMensaje("Materia eliminada correctamente");
        cargarMaterias();
      } else {
        mostrarMensaje(data.mensaje || "Error al eliminar", "danger");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      mostrarMensaje("Error de comunicación con la API", "danger");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <main className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Gestión de Materias</h2>

        {mensaje && (
          <div className={`p-4 mb-6 rounded-lg text-sm ${mensaje.tipo === "danger" ? "bg-red-900/50 border border-red-700 text-red-200" : "bg-green-900/50 border border-green-700 text-green-200"}`}>
            {mensaje.texto}
          </div>
        )}

        {/* Tarjeta del Formulario */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg mb-8">
          <FormularioMateria
            materiaAEditar={materiaAEditar}
            onGuardar={handleGuardar}
            onCancelar={() => setMateriaAEditar(null)}
          />
        </div>

        {/* Tarjeta del Listado */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Listado de Materias</h3>
          <ListaMaterias
            materias={materias}
            onEditar={(materia) => setMateriaAEditar(materia)}
            onEliminar={handleEliminar}
          />
        </div>
      </main>
    </div>
  );
};

export default Materias;