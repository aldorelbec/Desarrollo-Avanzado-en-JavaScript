import { hacerReserva } from './reserva';

console.log('--- Caso de Éxito: Reserva de 2 mesas ---');
hacerReserva('Mariana', 2);

setTimeout(() => {
  console.log('\n--- Caso de Error: Reserva de 7 mesas (no disponibles) ---');
  hacerReserva('Pedro', 7);
}, 4000);

setTimeout(() => {
  console.log('\n--- Caso de Éxito con Posible Fallo en Correo ---');
  hacerReserva('Sofía', 3);
}, 8000);