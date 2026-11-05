const ListaMaterias = ({ materias, onEditar, onEliminar }) => {
  if (!materias || materias.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700 text-center text-gray-400 text-sm">
        No hay materias registradas en el sistema.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-900 text-gray-300 uppercase text-xs tracking-wider border-b border-gray-700">
          <tr>
            <th className="py-3 px-4 font-semibold">Código</th>
            <th className="py-3 px-4 font-semibold">Nombre</th>
            <th className="py-3 px-4 font-semibold">Descripción</th>
            <th className="py-3 px-4 font-semibold">Carga Horaria</th>
            <th className="py-3 px-4 font-semibold">Estado</th>
            <th className="py-3 px-4 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 text-sm text-gray-200">
          {materias.map((materia) => (
            <tr key={materia.codigo} className="hover:bg-gray-900/40 transition-colors">
              <td className="py-3 px-4 font-bold text-white">{materia.codigo}</td>
              <td className="py-3 px-4">{materia.nombre}</td>
              <td className="py-3 px-4 text-gray-400">{materia.descripcion || "-"}</td>
              <td className="py-3 px-4">{materia.cargaHoraria} hs</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                    materia.estado === "activa"
                      ? "bg-green-900/50 text-green-300 border border-green-700"
                      : "bg-red-900/50 text-red-300 border border-red-700"
                  }`}
                >
                  {materia.estado}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    onClick={() => onEditar(materia)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    onClick={() => onEliminar(materia.codigo)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMaterias;