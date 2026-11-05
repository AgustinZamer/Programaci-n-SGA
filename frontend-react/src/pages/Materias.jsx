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
    <div>
      <h2>Gestión de Materias</h2>

      {mensaje && (
        <div className={`alert ${mensaje.tipo === "danger" ? "alert-danger" : "alert-success"}`}>
          {mensaje.texto}
        </div>
      )}

      <FormularioMateria
        materiaAEditar={materiaAEditar}
        onGuardar={handleGuardar}
        onCancelar={() => setMateriaAEditar(null)}
      />

      <ListaMaterias
        materias={materias}
        onEditar={(materia) => setMateriaAEditar(materia)}
        onEliminar={handleEliminar}
      />
    </div>
  );
};

export default Materias;