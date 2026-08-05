console.log("Inicio")
setTimeout(()=> {
    console.log("Buscando alumnos...")
}, 3000)
console.log("Fin")

function saludar(){
    console.log("Hola")
}
function ejecutar(funcion){
    funcion();
}
ejecutar(saludar)

function despedirse(){
    console.log("Hasta luego")
}

setTimeout(despedirse, 3000);

setTimeout(()=>{
    console.log("Buscando docentes...")
}, 4000)
setTimeout(()=>{
    console.log("Buscando materias...")
}, 2000)

setTimeout (()=>{
console.log("Buscando cursos...")
}, 1000);

console.log("Abriendo SGA")
setTimeout(()=>{
    console.log("Alumnos cargados...")
}, 3000)

console.log("El usuario puede seguir nvegando")

function obtenerAlumnos(){
    return new Promise((resolve) => {
        setTimeout(() => { 
            resolve(["Ana", "Jose", "Rosa"])
        }, 3000)
    })
}
obtenerAlumnos(). then((alumnos) => {
    console.log(alumnos)
})

async function iniciar(){
    const alumnos = await obtenerAlumnos()
    console.log(alumnos)
}
iniciar()

function obtenerClima(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Soleado")
        }, 2000)
    })
}

// con then()
obtenerClima(). then((clima) => {
    console.log(clima)
});

// con async/await
async function MostrarClima(){
    const clima = await obtenerClima()
    console.log(clima)
}

MostrarClima()

function consultarSaldo(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(125000)
        }, 3000);
    })
}

async function mostrarSaldo() {
    const saldo = await consultarSaldo()
    console.log(`Su saldo es: $${saldo}`)
}
mostrarSaldo()

function iniciarSesion(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Bienvenido, Agustin")
        }, 2000)
    })
}

async function mostarUsuario(){
    const usuario = await iniciarSesion()
    console.log(usuario)
}
mostrarUsuario()

function obtenerUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id:1,
                nombre: "Agustin",
                edad: 20
            })
        }, 3000)
    })
}
async function mostrarUsuario(){
    console.log("Consultando usuario...")
    const usuario = await obtenerUsuario()
    console.log(usuario)
}
mostrarUsuario()
