// const alumnos = [
//     {
//         id: 1,
//         nombre: "Ana"
//     },
//     {
//         id: 2,
//         nombre: "José"
//     }
// ];
// function obtenerAlumnos(){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(alumnos)
//         }, 2000);
//     })
// }

// crear obtenerMaterias()
// crear obtenerDocentes()
// mostrar los datos a través de async/await

async function obtenerAlumnos() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    const alumnos = await respuesta.json()
    return alumnos
}

function mostrarAlumnos(alumnos){
   console.log(alumnos)
//    console.log(alumnos[5])
// for (const alumno of alumnos){
//     console.log(alumno.id, alumno.name, alumno.email)
// }
}

async function inciar(){
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}

inciar()

// /post
// /comments
// id, título, usuario