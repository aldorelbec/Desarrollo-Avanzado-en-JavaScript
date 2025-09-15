document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtén el formulario del DOM
    const form = document.getElementById('registroForm');
    
    // Define el esquema de validación usando Zod
    const registroSchema = Zod.object({
        nombre: Zod.string()
                   .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
                   .max(50, { message: 'El nombre no puede exceder los 50 caracteres.' }),
        email: Zod.string()
                  .email({ message: 'El correo electrónico no es válido.' }),
        password: Zod.string()
                     .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
                     .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' })
                     .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número.' }),
    });

    // 2. Agrega un "event listener" para el evento de envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Limpiar mensajes de error anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // 3. Captura los datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // 4. Valida los datos con el esquema de Zod
        const validation = registroSchema.safeParse(data);

        // 5. Maneja el resultado de la validación
        if (!validation.success) {
            // Si la validación falla, muestra los mensajes de error
            validation.error.issues.forEach(issue => {
                const fieldName = issue.path[0];
                const errorMessageElement = document.getElementById(`error-${fieldName}`);
                if (errorMessageElement) {
                    errorMessageElement.textContent = issue.message;
                }
            });
            console.log('Errores de validación:', validation.error.issues);
        } else {
            // Si la validación es exitosa, procesa el formulario
            console.log('Datos del formulario validados con éxito:', validation.data);
            alert('¡Registro exitoso! Los datos son válidos.');
            form.reset(); // Opcional: limpia el formulario después de un envío exitoso
        }
    });
});