const boton = document.getElementById('botonTema');
const body = document.body;

// Escucha el evento de clic en el botón
boton.addEventListener('click', () => {
    // Alterna la clase 'tema-oscuro' en el body
    body.classList.toggle('tema-oscuro');
});