
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



/* ==========================================
   6. ACCESO A LA CUENTA (LOGIN Y REGISTRO)
   ========================================== */

// Mostrar la ventana de inicio de sesión
function mostrarLogin() {

    // Buscamos las ventanas de login y registro
    let login = document.getElementById("ventanaLogin");
    let registro = document.getElementById("ventanaRegistro");

    // Ocultamos el registro
    if (registro) {
        registro.style.display = "none";
    }

    // Mostramos el inicio de sesión
    if (login) {
        login.style.display = "flex";
    }
}


// Mostrar la ventana de creación de cuenta
function mostrarRegistro() {

    // Buscamos las ventanas
    let login = document.getElementById("ventanaLogin");
    let registro = document.getElementById("ventanaRegistro");

    // Ocultamos el inicio de sesión
    if (login) {
        login.style.display = "none";
    }

    // Mostramos el registro
    if (registro) {
        registro.style.display = "flex";
    }
}


// Cerrar la ventana de inicio de sesión
function cerrarLogin() {

    // Buscamos la ventana de login
    let login = document.getElementById("ventanaLogin");

    // Ocultamos la ventana
    if (login) {
        login.style.display = "none";
    }
}


// Cerrar la ventana de registro
function cerrarRegistro() {

    // Buscamos la ventana de registro
    let registro = document.getElementById("ventanaRegistro");

    // Ocultamos la ventana
    if (registro) {
        registro.style.display = "none";
    }
}


/* ==========================================
   7. REGISTRO E INICIO DE SESIÓN
   ========================================== */

// Esperamos a que cargue el contenido HTML
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos los formularios
    let formularioRegistro = document.getElementById("formRegistro");
    let formularioLogin = document.getElementById("formLogin");


    // ==========================================
    // 7.1 REGISTRO DE NUEVA CUENTA
    // ==========================================

    // Comprobamos que el formulario exista
    if (formularioRegistro) {

        // Detectamos cuando se envía el formulario
        formularioRegistro.addEventListener("submit", function (event) {

            // Evitamos que la página se recargue
            event.preventDefault();

            // Obtenemos los datos ingresados
            let nombre = document.getElementById("nombreRegistro").value.trim();
            let apellido = document.getElementById("apellidoRegistro").value.trim();
            let correo = document.getElementById("correoRegistro").value.trim().toLowerCase();
            let password = document.getElementById("passwordRegistro").value;


            // Comprobamos las condiciones de la contraseña
            let condiciones = 0;

            // Verificamos si tiene una letra mayúscula
            if (/[A-Z]/.test(password)) {
                condiciones++;
            }

            // Verificamos si tiene una letra minúscula
            if (/[a-z]/.test(password)) {
                condiciones++;
            }

            // Verificamos si tiene un número
            if (/[0-9]/.test(password)) {
                condiciones++;
            }

            // Verificamos si tiene un carácter especial
            if (/[^A-Za-z0-9]/.test(password)) {
                condiciones++;
            }

            // Comprobamos que tenga mínimo 7 caracteres y 3 condiciones
            if (password.length < 7 || condiciones < 3) {

                alert("La contraseña debe tener mínimo 7 caracteres y cumplir al menos 3 de estas condiciones: mayúscula, minúscula, número y carácter especial.");

                return;
            }


            // Obtenemos las cuentas guardadas
            let cuentas = JSON.parse(localStorage.getItem("cuentasOptica")) || [];

            // Variable para comprobar si el correo ya existe
            let correoRepetido = false;

            // Recorremos las cuentas registradas
            for (let i = 0; i < cuentas.length; i++) {

                // Comprobamos si el correo ya está registrado
                if (cuentas[i].correo === correo) {
                    correoRepetido = true;
                }
            }

            // Si el correo ya existe, mostramos un mensaje
            if (correoRepetido) {

                alert("Este correo ya tiene una cuenta registrada.");

                return;
            }


            // Creamos una nueva cuenta con los datos ingresados
            let nuevaCuenta = {
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                password: password
            };

            // Agregamos la nueva cuenta a la lista
            cuentas.push(nuevaCuenta);

            // Guardamos las cuentas en el navegador
            localStorage.setItem("cuentasOptica", JSON.stringify(cuentas));

            // Mostramos un mensaje de confirmación
            alert("¡Cuenta creada correctamente!");

            // Limpiamos los campos del formulario
            formularioRegistro.reset();

            // Volvemos a la ventana de inicio de sesión
            mostrarLogin();

            // Colocamos el correo registrado en el login
            document.getElementById("correoLogin").value = correo;

        });
    }


    // ==========================================
    // 7.2 INICIO DE SESIÓN
    // ==========================================

    // Comprobamos que el formulario exista
    if (formularioLogin) {

        // Detectamos cuando se envía el formulario
        formularioLogin.addEventListener("submit", function (event) {

            // Evitamos que la página se recargue
            event.preventDefault();

            // Obtenemos el correo y la contraseña
            let correo = document.getElementById("correoLogin").value.trim().toLowerCase();
            let password = document.getElementById("passwordLogin").value;

            // Obtenemos las cuentas guardadas
            let cuentas = JSON.parse(localStorage.getItem("cuentasOptica")) || [];

            // Variable para comprobar si los datos coinciden
            let cuentaEncontrada = false;

            // Recorremos las cuentas registradas
            for (let i = 0; i < cuentas.length; i++) {

                // Comprobamos el correo y la contraseña
                if (
                    cuentas[i].correo === correo &&
                    cuentas[i].password === password
                ) {
                    cuentaEncontrada = true;
                }
            }

            // Si los datos son correctos
            if (cuentaEncontrada) {

                alert("¡Bienvenido a Óptica G&A!");

                // Limpiamos el formulario
                formularioLogin.reset();

                // Cerramos la ventana
                cerrarLogin();

            } else {

                // Si los datos son incorrectos
                alert("Correo o contraseña incorrectos.");

            }

        });
    }

});


