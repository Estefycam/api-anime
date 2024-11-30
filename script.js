// Referencias a elementos del DOM
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const animeList = document.getElementById("animeList");

// Función para consultar la API
async function fetchAnimes(query) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de la API");
    }
    const data = await response.json();// Convierte la respuesta a JSON
    return data.data; // La API devuelve un array de animes en `data`
  } catch (error) {
    console.error(error.message);
    animeList.innerHTML = `<p>Error: ${error.message}</p>`;}}

// Función para renderizar animes en el DOM
function renderAnimes(animes) {
  animeList.innerHTML = ""; // Limpiar contenido previo
  animes.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.className = "anime-card";
    animeCard.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || "N/A"}</p>
      <p>Tipo: ${anime.type || "No hay sinopsis disponible."}</p>
      <p>Episodios: ${anime.episodes}</p>
      <p>Duracion: ${anime.duration} </p>
    `;
    animeList.appendChild(animeCard);
  });
}

// Manejar eventos de búsqueda
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const animes = await fetchAnimes(query);
    if (animes) {
      renderAnimes(animes);
    }
  } else {
    animeList.innerHTML = "<p>Por favor, ingresa un término de búsqueda.</p>";
  }
});
