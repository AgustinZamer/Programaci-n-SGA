const alumnos = [
    {
        id: 1,
        nombre: "Agustin"
    },
    {
        id: 2,
        nombre: "Zamer"
    }
];
function obtenerAlumno() {
return new Promise((resolve) => {
    setTimeout(() => {
        resolve(alumnos)
    }, 2000)
})
}
async function iniciar(){
    const datos = await obtenerAlumno()
    console.table(datos)
}
iniciar()

// crear Obteneraterias()
// crear obtenerDocentes()
// mostrar los datos a traves de async/await
