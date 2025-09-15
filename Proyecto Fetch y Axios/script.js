
const API_URL = 'https://rickandmortyapi.com/api/character';

// Referencias a los elementos del DOM
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');
const loader = document.getElementById('loader');

// --- FUNCIONES ---

/**
 * Muestra los personajes en el contenedor principal.
 * @param {Array} characters - Un array de objetos de personajes.
 */
const displayCharacters = (characters) => {
    dataContainer.innerHTML = ''; // Limpiar contenido anterior
    characters.forEach(character => {
        // Se crea una tarjeta para cada personaje con su nombre e imagen
        const card = document.createElement('div');
        card.className = 'character-card bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <img src="${character.image}" alt="Imagen de ${character.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-bold text-gray-900">${character.name}</h2>
                <p class="text-sm text-gray-600 mt-1">Estado: ${character.status}</p>
                <p class="text-sm text-gray-600">Especie: ${character.species}</p>
            </div>
        `;
        dataContainer.appendChild(card);
    });
};

/**
 * Muestra u oculta el indicador de carga.
 * @param {boolean} isLoading - True para mostrar, false para ocultar.
 */
const showLoader = (isLoading) => {
    loader.classList.toggle('hidden', !isLoading);
};

/**
 * Muestra un mensaje de error en el contenedor de datos.
 * @param {string} message - El mensaje de error a mostrar.
 */
const displayError = (message) => {
    dataContainer.innerHTML = `<div class="col-span-full text-center p-8 bg-red-100 text-red-700 rounded-lg">
        <h3 class="font-bold text-lg">Ocurrió un error</h3>
        <p>${message}</p>
    </div>`;
}

/**
 * Obtiene datos de la API utilizando fetch.
 */
const getDataWithFetch = async () => {
    showLoader(true);
    dataContainer.innerHTML = '';
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        console.error('Error con Fetch:', error);
        displayError(error.message);
    } finally {
        showLoader(false);
    }
};

/**
 * Obtiene datos de la API utilizando Axios.
 */
const getDataWithAxios = async () => {
    showLoader(true);
    dataContainer.innerHTML = '';
    try {
        // Axios maneja la respuesta y la convierte a JSON automáticamente
        const response = await axios.get(API_URL);
        displayCharacters(response.data.results);
    } catch (error) {
        console.error('Error con Axios:', error);
        displayError(error.message);
    } finally {
        showLoader(false);
    }
};

// --- EVENT LISTENERS ---

// Asignar las funciones a los clics de los botones
fetchBtn.addEventListener('click', getDataWithFetch);
axiosBtn.addEventListener('click', getDataWithAxios);
