document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    
    // Obtener referencias a los campos y sus mensajes de error
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const fechaInput = document.getElementById('fecha');

    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorFecha = document.getElementById('errorFecha');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío del formulario por defecto

        // Limpiar mensajes de error previos
        errorNombre.textContent = '';
        errorEmail.textContent = '';
        errorTelefono.textContent = '';
        errorFecha.textContent = '';
        
        let isValid = true;

        // Validación 1: Nombre (no debe contener números ni caracteres especiales)
        const nombreRegex = /^[A-Za-z\s]+$/;
        if (nombreInput.value.trim() === '') {
            errorNombre.textContent = 'El nombre es obligatorio.';
            isValid = false;
        } else if (!nombreRegex.test(nombreInput.value)) {
            errorNombre.textContent = 'El nombre no debe contener números o caracteres especiales.';
            isValid = false;
        }

        // Validación 2: Email (formato de email válido)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            errorEmail.textContent = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            errorEmail.textContent = 'Por favor, ingrese un correo electrónico válido.';
            isValid = false;
        }

        // Validación 3: Teléfono (al menos 10 dígitos)
        const telefonoRegex = /^\d{10,}$/;
        if (telefonoInput.value.trim() === '') {
            errorTelefono.textContent = 'El número de teléfono es obligatorio.';
            isValid = false;
        } else if (!telefonoRegex.test(telefonoInput.value)) {
            errorTelefono.textContent = 'El teléfono debe tener al menos 10 dígitos y solo números.';
            isValid = false;
        }
        
        // Validación 4: Fecha (no puede ser una fecha pasada)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(fechaInput.value);

        if (fechaInput.value === '') {
            errorFecha.textContent = 'La fecha del evento es obligatoria.';
            isValid = false;
        } else if (selectedDate < today) {
            errorFecha.textContent = 'No puede seleccionar una fecha pasada.';
            isValid = false;
        }

        if (isValid) {
            // Si todas las validaciones pasan, se puede enviar el formulario
            alert('¡Formulario enviado con éxito!');
            form.submit(); // Envía el formulario si pasa la validación
        }
    });
});