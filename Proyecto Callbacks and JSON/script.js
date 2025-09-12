// =========================
// Simulación de JSON inicial
// =========================
let biblioteca = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    disponible: true,
  },
  {
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    genero: "Fantasía",
    disponible: false,
  },
];

// =========================
// Funciones de lectura/escritura simulada
// =========================
function leerDatos(callback) {
  console.log("Leyendo datos de la biblioteca...");
  setTimeout(() => {
    callback(null, biblioteca); // callback(error, datos)
  }, 1000);
}

function escribirDatos(nuevosDatos, callback) {
  console.log("Escribiendo datos en la biblioteca...");
  setTimeout(() => {
    biblioteca = nuevosDatos; // Simula escritura en archivo
    callback(null, "Datos guardados exitosamente ✅");
  }, 1000);
}

// =========================
// Funciones para gestionar libros
// =========================

// 1. Consultar libros
function consultarLibros() {
  leerDatos((error, datos) => {
    if (error) {
      console.error("Error al leer los datos:", error);
      return;
    }
    console.log("\n📚 Inventario de libros:");
    datos.forEach((libro, index) => {
      console.log(
        `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.genero}) | ${
          libro.disponible ? "Disponible" : "Prestado"
        }`
      );
    });
  });
}

// 2. Agregar un libro
function agregarLibro(nuevoLibro) {
  leerDatos((error, datos) => {
    if (error) {
      console.error("Error al leer los datos:", error);
      return;
    }
    datos.push(nuevoLibro);
    escribirDatos(datos, (err, mensaje) => {
      if (err) {
        console.error("Error al escribir datos:", err);
        return;
      }
      console.log(mensaje);
      consultarLibros();
    });
  });
}

// 3. Actualizar disponibilidad de un libro
function actualizarDisponibilidad(titulo, disponible) {
  leerDatos((error, datos) => {
    if (error) {
      console.error("Error al leer los datos:", error);
      return;
    }
    const libro = datos.find((lib) => lib.titulo === titulo);
    if (!libro) {
      console.log("❌ Libro no encontrado.");
      return;
    }
    libro.disponible = disponible;
    escribirDatos(datos, (err, mensaje) => {
      if (err) {
        console.error("Error al escribir datos:", err);
        return;
      }
      console.log(mensaje);
      consultarLibros();
    });
  });
}

// =========================
// Ejemplo de uso
// =========================
consultarLibros();

setTimeout(() => {
  agregarLibro({
    titulo: "1984",
    autor: "George Orwell",
    genero: "Distopía",
    disponible: true,
  });
}, 2000);

setTimeout(() => {
  actualizarDisponibilidad("Cien años de soledad", false);
}, 5000);
