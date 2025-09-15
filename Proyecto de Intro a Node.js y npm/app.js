
const planetas = require('./planetas');


planetas.agregarPlaneta('Tierra', 'Rocoso');
planetas.agregarPlaneta('Marte', 'Rocoso');
planetas.agregarPlaneta('Júpiter', 'Gigante Gaseoso');


console.log('--- ¡Bienvenido, explorador! ---');
console.log('Aquí está tu lista de planetas favoritos:');

const listaDePlanetas = planetas.obtenerPlanetas();


if (listaDePlanetas.length > 0) {
  for (const planeta of listaDePlanetas) {
    console.log(`- Nombre: ${planeta.nombre} | Tipo: ${planeta.tipo}`);
  }
} else {
  console.log('Aún no has agregado ningún planeta a tu lista.');
}

console.log('--- ¡Felices exploraciones! ---');