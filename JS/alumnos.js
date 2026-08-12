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
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null

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

    mostrarMensaje("Alumno guardado correctamente")

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

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = " ";
    }, 3000);
}


function mostraAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button class="btn-editar" data-id="${alumno.id}">Editar</button>
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
            </td>
        </tr>
        `;
    }
}
function eliminarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(
        alumno => alumno.id !== id
    );
    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))
    mostraAlumnos(alumnosActualizados)
    mostrarMensaje("Alumno eliminado correctamente")
}

listaAlumnos.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-eliminar")) {
            const id = Number(e.target.dataset.id)
            eliminarAlumno(id)
        }
})

function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoEditandoId = id;
}