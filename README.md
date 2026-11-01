# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.


## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.


## Tecnologías

Actualmente:

- HTML5
- JavaScript
- CSS
- React (Vite + Material UI)
- express
- Node.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken (JWT)


## Estado del proyecto

- Versión: 
Clase 18 - Estructura actual
SGA/
frontend-react/
 ├── src/
 │    ├── assets/
 │    ├── components/
 │    │    ├── FormularioMateria.jsx
 │    │    ├── Header.jsx
 │    │    ├── ListaMaterias.jsx
 │    │    └── ...
 │    ├── pages/
 │    │    ├── Alumnos.jsx
 │    │    ├── Docentes.jsx
 │    │    ├── Materias.jsx
 │    │    └── ...
 │    ├── App.jsx
 │    └── main.jsx
 ├── index.html
 ├── package.json
 └── vite.config.js
backend/
 ├── config/
 │    └── database.js
 ├── controllers/
 │    ├── alumnos.controller.js
 │    ├── authController.js
 │    ├── docentes.controller.js
 │    └── materiaController.js
 ├── models/
 │    ├── Alumno.js
 │    ├── Docente.js
 │    ├── Materia.js
 │    └── Usuario.js
 ├── routes/
 │    ├── alumnos.routes.js
 │    ├── docentes.routes.js
 │    ├── materiaRoutes.js
 │    └── usuarios.routes.js
 ├── .env
 ├── package.json
 ├── pruebas.http
 └── server.js

## Estado actual
- Página de inicio y navegación entre módulos
- Módulo alumnos docentes
- CRUD alumnos/docentes
- Validaciones de formularios
- Persistencia mediante localStorage
- Organización del código y refactorización
- Separación inicial entre Frontend y Backend
- Implementación de validaciones para los datos recibidos mediante req.body
- Uso de status 400 para datos inválidos
- status 404 para alumno no encontrado
- status 201 para registrar nuevo alumno
- Manejo básico de errores en la operaciones del CRUD.
- Instalación de mongoose
- Creación de la conexión con MongoDB en config/database.js
- Creación del Schema y modelo Alumno
- Reemplazo del array en memoria por una colección de MongoDB
- Modificación de GET /alumnos para consultar MongoDB mediante mongoose
- Prueba de la API con datos almacenados en MongoDB
- Registro y login de usuarios con bcrypt y JWT
- Creación del Schema y modelo Materia con validación de código único, carga horaria y estado
- Controlador y rutas REST para el CRUD completo del módulo Materias operando por código
- Pruebas completas de la API verificadas en pruebas.http
- Migración e integración del frontend a React con Vite y Material UI (MUI)
- Módulo de Materias completo en frontend (formulario, listado y CRUD integrado operando por código)
- Integración de navegación global y rutas mediante React Router


## Almacenamiento

- localStorage
- JSON.stringify()
- JSON.parse()
- MongoDB

## Autor

Agustín Zamer

Programación IV