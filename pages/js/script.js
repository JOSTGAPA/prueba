
/* ==========================================
   ÓPTICA G&A - ARCHIVO JAVASCRIPT
   ========================================== */


/* ==========================================
   1. ARRAYS PARALELOS Y MANIPULACIÓN DEL DOM
   ========================================== */

// Esperamos a que cargue todo el contenido HTML
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos todos los elementos que tengan la clase product-card
    let productos = document.querySelectorAll(".product-card");

    // Creamos tres arrays para guardar la información
    let nombresProductos = [];
    let marcasProductos = [];
    let preciosProductos = [];

    // Recorremos todos los productos uno por uno
    for (let i = 0; i < productos.length; i++) {

        // Buscamos el nombre y la marca de cada producto
        let nombre = productos[i].querySelector(".product-name");
        let marca = productos[i].querySelector(".brand");

        // Guardamos el nombre y la marca en sus respectivos arrays
        nombresProductos.push(nombre.textContent.trim());
        marcasProductos.push(marca.textContent.trim());

        // Obtenemos el precio desde el atributo data-precio
        let precio = productos[i].getAttribute("data-precio");

        // Si no encuentra el atributo, busca el precio dentro del HTML
        if (precio === null) {
            precio = productos[i].querySelector(".price").textContent;
        }

        // Convertimos el precio en un número
        precio = parseFloat(precio.replace(",", ".").replace(/[^0-9.]/g, ""));

        // Guardamos el precio en el array
        preciosProductos.push(precio);
    }

    // Buscamos el elemento que muestra la cantidad de productos
    let contador = document.querySelector(".product-count");

    // Si existe el contador, actualizamos su contenido
    if (contador) {
        contador.textContent = "Mostrando " + productos.length + " productos";
    }

    // Mostramos los tres arrays en la consola del navegador
    console.log("Nombres:", nombresProductos);
    console.log("Marcas:", marcasProductos);
    console.log("Precios:", preciosProductos);

});


/* ==========================================
   2. FUNCIONES DE FILTROS
   ========================================== */

// Mostrar u ocultar el panel de filtros
function mostrarFiltros() {

    // Buscamos el panel de filtros por su ID
    let panel = document.getElementById("filterPanel");

    // Agregamos o quitamos la clase active
    panel.classList.toggle("active");
}


// Aplicar filtros por marca y precio
function aplicarFiltros() {

    // Obtenemos la marca seleccionada
    let marcaSeleccionada = document.getElementById("marca").value;

    // Obtenemos el precio mínimo y evitamos valores negativos
    let precioMin = Math.max(0, parseFloat(document.getElementById("precioMin").value) || 0);

    // Obtenemos el precio máximo y evitamos valores negativos
    // Infinity significa que no hay un límite máximo
    let precioMax = Math.max(0, parseFloat(document.getElementById("precioMax").value) || Infinity);

    // Comprobamos que el precio mínimo no sea mayor al máximo
    if (precioMin > precioMax) {
        alert("El precio mínimo no puede ser mayor al precio máximo.");
        return; // Detiene la función
    }

    // Buscamos todos los productos
    let productos = document.querySelectorAll(".product-card");

    // Contamos cuántos productos cumplen los filtros
    let cantidad = 0;

    // Recorremos todos los productos
    for (let i = 0; i < productos.length; i++) {

        // Obtenemos la marca y el precio de cada producto
        let marca = productos[i].getAttribute("data-marca");
        let precio = parseFloat(productos[i].getAttribute("data-precio"));

        // Comprobamos si cumple las condiciones seleccionadas
        if (
            (marcaSeleccionada === "todas" || marca === marcaSeleccionada) &&
            precio >= precioMin &&
            precio <= precioMax
        ) {

            // Mostramos el producto si cumple los filtros
            productos[i].style.display = "block";
            cantidad++;

        } else {

            // Ocultamos el producto si no cumple los filtros
            productos[i].style.display = "none";
        }
    }

    // Actualizamos el contador con los resultados encontrados
    document.querySelector(".product-count").textContent =
        "Mostrando " + cantidad + " productos";
}


// Limpiar todos los filtros
function limpiarFiltros() {

    // Restauramos la marca a la opción todas
    document.getElementById("marca").value = "todas";

    // Dejamos vacíos los campos de precios
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";

    // Buscamos todos los productos
    let productos = document.querySelectorAll(".product-card");

    // Recorremos los productos
    for (let i = 0; i < productos.length; i++) {

        // Volvemos a mostrar todos los productos
        productos[i].style.display = "block";
    }

    // Restauramos el contador original
    document.querySelector(".product-count").textContent =
        "Mostrando " + productos.length + " productos";
}


/* ==========================================
   3. ORDENAMIENTO DE PRODUCTOS
   ========================================== */

function ordenarProductos() {

    // Obtenemos la opción seleccionada en el menú
    let orden = document.getElementById("ordenarProductos").value;

    // Buscamos el contenedor de los productos
    let contenedor = document.querySelector(".products-grid");

    // Obtenemos los productos y los convertimos en un array
    let productos = Array.from(contenedor.querySelectorAll(".product-card"));

    // Ordenar de mayor a menor precio
    if (orden === "mayor") {

        productos.sort(function (a, b) {

            // Compara los precios de dos productos
            return Number(b.getAttribute("data-precio")) -
                   Number(a.getAttribute("data-precio"));
        });

    // Ordenar de menor a mayor precio
    } else if (orden === "menor") {

        productos.sort(function (a, b) {

            // Compara los precios en orden ascendente
            return Number(a.getAttribute("data-precio")) -
                   Number(b.getAttribute("data-precio"));
        });

    }

    // Colocamos los productos en el nuevo orden
    for (let i = 0; i < productos.length; i++) {
        contenedor.appendChild(productos[i]);
    }
}


/* ==========================================
   4. EVENTOS E INTERACCIÓN CON PRODUCTOS
   ========================================== */

// Esperamos a que cargue el contenido HTML
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos todos los botones de los productos
    let botones = document.querySelectorAll(".btn-quick-add");

    // Recorremos todos los botones
    for (let i = 0; i < botones.length; i++) {

        // Agregamos un evento de clic a cada botón
        botones[i].addEventListener("click", function (event) {

            // Evita que se ejecute la acción predeterminada del enlace
            event.preventDefault();

            // Mostramos un mensaje al usuario
            alert("¡Este producto está disponible para recoger al día siguiente!");

        });
    }
});


/* ==========================================
   5. VENTANA DE SUSCRIPCIÓN
   ========================================== */

// Mostrar la ventana de suscripción
function mostrarSuscripcion() {

    // Buscamos la ventana y la hacemos visible
    document.getElementById("ventanaSuscripcion").style.display = "flex";
}


// Cerrar la ventana de suscripción
function cerrarSuscripcion() {

    // Ocultamos la ventana
    document.getElementById("ventanaSuscripcion").style.display = "none";

    // Limpiamos los campos del formulario
    document.getElementById("formSuscripcion").reset();
}


// Validar y procesar el formulario
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos el formulario de suscripción
    let formulario = document.getElementById("formSuscripcion");

    // Comprobamos que el formulario exista en esta página
    if (formulario) {

        // Detectamos cuando el usuario envía el formulario
        formulario.addEventListener("submit", function (event) {

            // Evitamos que la página se recargue
            event.preventDefault();

            // Obtenemos el nombre y el correo ingresados
            let nombre = document.getElementById("nombreSuscripcion").value.trim();
            let correo = document.getElementById("correoSuscripcion").value.trim();

            // Comprobamos que los campos no estén vacíos
            if (nombre === "" || correo === "") {
                alert("Completa todos los campos.");
                return;
            }

            // Mostramos el mensaje de agradecimiento
            alert("¡Gracias por suscribirte, " + nombre + "!");

            // Limpiamos el formulario
            formulario.reset();

            // Cerramos la ventana
            cerrarSuscripcion();
        });
    }
});
