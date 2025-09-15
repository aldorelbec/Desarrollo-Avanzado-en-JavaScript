const MESAS_DISPONIBLES = 5;

function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= MESAS_DISPONIBLES) {
        resolve(`✅ Mesas disponibles: ${MESAS_DISPONIBLES}. Su reserva de ${mesasSolicitadas} mesas es posible.`);
      } else {
        reject(new Error(`❌ Lo sentimos, no hay suficientes mesas disponibles. Mesas solicitadas: ${mesasSolicitadas}, Mesas disponibles: ${MESAS_DISPONIBLES}.`));
      }
    }, 1000);
  });
}

function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(`📧 Confirmación enviada exitosamente a ${nombreCliente}. ¡Nos vemos pronto!`);
      } else {
        reject(new Error(`❌ Fallo al enviar la confirmación por correo a ${nombreCliente}. Por favor, intente de nuevo.`));
      }
    }, 1500);
  });
}

async function hacerReserva(nombreCliente, mesasSolicitadas) {
  console.log(`⏳ Procesando la reserva para ${nombreCliente} con ${mesasSolicitadas} mesas...`);
  try {
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);

    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);
    
    console.log(`✔️ ¡Reserva completada con éxito para ${nombreCliente}!`);
  } catch (error) {
    console.error(`🔴 Ha ocurrido un problema con la reserva:`, error.message);
  }
}

module.exports = { hacerReserva };