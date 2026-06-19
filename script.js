const searchInput = document.querySelector('#search');
const resultsContainer = document.querySelector('#results');
const Estadotraducido = {
    "Alive": "Vivo",
    "Dead": "Muerto",
    "unknown": "Desconocido",
    "Human": "Humano",
    "Alien": "Alienígena",
    "Humanoid": "Humanoide",
    "unknown": "Desconocida" // Para especie
};
const randomBtn = document.querySelector('#random-btn');


async function buscarPersonajes(nombre) {
    try {
        // 1. Petición a la API
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
        const data = await response.json();

        // 2. Limpiar contenedor previo
        resultsContainer.innerHTML = '';

        // 3. Pintar los resultados
        
        
        
        
       for (const personaje of data.results){
        const primerEpisodioURL = personaje.episode[0];


        
        const respuestaEpisodio = await fetch(primerEpisodioURL);
            const datosEpisodio = await respuestaEpisodio.json();
            const nombreEpisodio = datosEpisodio.name;

              const estado = Estadotraducido[personaje.status] || personaje.status;
              const especie = Estadotraducido[personaje.species] || personaje.species;

          
        

            const card = `
                <div class="card">
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <h3>${personaje.name}</h3>
                    <p>Especie: ${especie}</p>
                    <p>Estado: ${estado}</p>
                    <p><strong>Visto por primera vez en:</strong> ${nombreEpisodio}</p>
                </div>
            `;
            resultsContainer.innerHTML += card;
        };
    } catch (error) {
        console.error("No se encontró el personaje", error);
        resultsContainer.innerHTML = '<p>No hay resultados para esa búsqueda.</p>';
    }
}

// Escuchar cuando el usuario escribe
searchInput.addEventListener('input', (e) => {
    buscarPersonajes(e.target.value);
});

async function obtenerPersonajeAleatorio() {
   
    try {
        // Generar ID al azar entre 1 y 826
        const idAleatorio = Math.floor(Math.random() * 826) + 1;
        
        const response = await fetch(`https://rickandmortyapi.com/api/character/${idAleatorio}`);
        const personaje = await response.json();

        // Obtener episodio
        const resEpisodio = await fetch(personaje.episode[0]);
        const datosEpisodio = await resEpisodio.json();
        const nombreEpisodio = datosEpisodio.name;

        // Traducir usando tu objeto Estadotraducido
        const estado = Estadotraducido[personaje.status] || personaje.status;
        const especie = Estadotraducido[personaje.species] || personaje.species;

        // Limpiar y mostrar el aleatorio
        resultsContainer.innerHTML = `
            <div class="card" style="border: 2px solid #97ce4c;">
                <img src="${personaje.image}" alt="${personaje.name}">
                <h3>${personaje.name}</h3>
                <p>Especie: ${especie}</p>
                <p>Estado: ${estado}</p>
                <p><strong>Visto por primera vez en:</strong> ${nombreEpisodio}</p>
            </div>
        `;
    } catch (error) {
        console.error("Error en aleatorio:", error);
    }
}

randomBtn.addEventListener('click', obtenerPersonajeAleatorio);