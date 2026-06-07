const contenedorPeliculas = document.getElementById("peliculas");
const textoBusqueda = document.getElementById("textoBusqueda");
const botonBuscar = document.getElementById("botonBuscar");

const url = "https://ghibliapi.vercel.app/films";
let peliculas = [];

function crearCardPelicula(pelicula) {
  return `
    <div class="card">
      <img src="${pelicula.image}" alt="${pelicula.title}">
      <div class="card-body">
        <h2>${pelicula.title}</h2>
        <p><strong>Director:</strong> ${pelicula.director}</p>
        <p><strong>Año:</strong> ${pelicula.release_date}</p>
        <p><strong>Puntuación:</strong> ${pelicula.rt_score}</p>
      </div>
    </div>
  `;
}

function mostrarPeliculas(lista) {
  contenedorPeliculas.innerHTML = "";

  lista.forEach((pelicula) => {
    contenedorPeliculas.innerHTML += crearCardPelicula(pelicula);
  });
}

function cargarPeliculas() {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      peliculas = datos;
      mostrarPeliculas(peliculas);
    });
}

function buscarPeliculas() {
  const texto = textoBusqueda.value.toLowerCase().trim();

  if (texto === "") {
    mostrarPeliculas(peliculas);
    return;
  }

  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.title.toLowerCase().includes(texto)
  );

  mostrarPeliculas(peliculasFiltradas);
}

botonBuscar.addEventListener("click", buscarPeliculas);

cargarPeliculas();