const planetasFavoritos = [];

function agregarPlaneta(nombre, tipo) {
  planetasFavoritos.push({ nombre, tipo });
}

function obtenerPlanetas() {
  return planetasFavoritos;
}


module.exports = {
  agregarPlaneta,
  obtenerPlanetas
};