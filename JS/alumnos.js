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
//    console.table(alumnos)
console.log(typeof alumnos)
localStorage.setItem("alumnos", JSON.stringify(alumnos))
const datos = localStorage.getItem("alumnos")
console.log(typeof datos)
console.log(datos)
const alumnosRecuperados = JSON.parse(datos)
console.log(typeof alumnosRecuperados)
console.table(alumnosRecuperados)
   
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

