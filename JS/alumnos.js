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

// async function obtenerAlumnos() {
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
//     const alumnos = await respuesta.json()
//     return alumnos
// }

// function mostrarAlumnos(alumnos){
// //    console.table(alumnos)
// console.log(typeof alumnos)
// localStorage.setItem("alumnos", JSON.stringify(alumnos))
// const datos = localStorage.getItem("alumnos")
// console.log(typeof datos)
// console.log(datos)
// const alumnosRecuperados = JSON.parse(datos)
// console.log(typeof alumnosRecuperados)
// console.table(alumnosRecuperados)

// //    console.log(alumnos[5])
// // for (const alumno of alumnos){
// //     console.log(alumno.id, alumno.name, alumno.email)
// // }
// }

// async function inciar(){
//     const alumnos = await obtenerAlumnos()  
//     mostrarAlumnos(alumnos)
// }

// inciar()

const formulario = document.querySelector("#formAlumno")

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.querySelector("#nombre").value
    const carrera = document.querySelector("#carrera").value
    const correo = document.querySelector("#correo").value
    
    const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    }
    const alumnos = obtenerAlumnos()
    alumnos.push(alumno)

    localStorage.setItem("alumnos", JSON.stringify(alumnos))

    mostraAlumnos(alumnos)

    formulario.reset()
});

function obtenerAlumnos() {
    const datos = localStorage.getItem("alumnos")
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}

const listaAlumnos = document.querySelector("#listaAlumnos")

function mostraAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <li>
            ${alumno.nombre} -
            ${alumno.carrera} -
            ${alumno.correo}
        </li>`;
    }
}
