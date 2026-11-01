const ListaMaterias = ({ materias, onEditar, onEliminar }) => {
  if (!materias || materias.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No hay materias registradas en el sistema.
      </div>
    );
  }

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Carga Horaria</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.codigo}>
              <td className="fw-bold">{materia.codigo}</td>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion || "-"}</td>
              <td>{materia.cargaHoraria} hs</td>
              <td>
                <span
                  className={`badge ${
                    materia.estado === "activa" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {materia.estado}
                </span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEditar(materia)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminar(materia.codigo)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMaterias;