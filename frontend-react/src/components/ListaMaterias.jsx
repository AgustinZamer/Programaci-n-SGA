const ListaMaterias = ({ materias, onEditar, onEliminar }) => {
  if (!materias || materias.length === 0) {
    return <p>No hay materias registradas.</p>;
  }

  return (
    <div className="lista-materias-container">
      <h3>Listado de Materias</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Carga Horaria</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.codigo}>
              <td>{materia.codigo}</td>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion || "-"}</td>
              <td>{materia.cargaHoraria} hs</td>
              <td>{materia.estado}</td>
              <td>
                <button onClick={() => onEditar(materia)}>Editar</button>
                <button onClick={() => onEliminar(materia.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMaterias;