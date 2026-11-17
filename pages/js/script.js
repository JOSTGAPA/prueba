
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

// ==========================================
// CARRITO DE COMPRAS CON LOCALSTORAGE 
// ==========================================
var carrito = JSON.parse(localStorage.getItem('carritoOpticaGA')) || [];
var descuentoPorcentaje = Number(localStorage.getItem('descuentoOpticaGA')) || 0;

function guardarCarrito() {
    localStorage.setItem('carritoOpticaGA', JSON.stringify(carrito));
    localStorage.setItem('descuentoOpticaGA', descuentoPorcentaje);
    actualizarVistaCarrito();
}

function seleccionarProductoActual() {
    const marcaEl = document.querySelector('.product-brand, h1');
    const skuEl = document.querySelector('.product-sku');
    const precioEl = document.querySelector('.price-value');
    const imagenEl = document.querySelector('.main-image');

    const marca = marcaEl ? marcaEl.textContent.trim() : 'Lentes Óptica G&A';
    const modelo = skuEl ? skuEl.textContent.trim() : '';
    const nombreCompleto = modelo ? `${marca} - ${modelo}` : marca;

    let precio = 0;
    if (precioEl) {
        const match = precioEl.textContent.match(/(\d+(?:\.\d+)?)/);
        if (match) precio = parseFloat(match[1]);
    }

    const imagen = imagenEl ? imagenEl.getAttribute('src') : '../../img/pri_oft.png';

    const ruta = window.location.pathname.toLowerCase();
    let categoria = 'LENTES OFTÁLMICOS';
    if (ruta.includes('sol')) categoria = 'LENTES DE SOL';
    else if (ruta.includes('contacto') || ruta.includes('cont-')) categoria = 'LENTES DE CONTACTO';

    agregarAlCarrito(nombreCompleto, precio, imagen, categoria);
}

function agregarAlCarrito(nombre, precio, imagen, categoria = 'LENTES OFTÁLMICOS') {
    const imagenNormalizada = imagen.replace(/^(\.\.\/)+/, '../../');

    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, imagen: imagenNormalizada, categoria, cantidad: 1 });
    }
    guardarCarrito();

    const cssLink = document.querySelector('link[href*="style.css"]');
    const esSubcarpeta = cssLink && cssLink.getAttribute('href').startsWith('../../../');

    window.location.href = esSubcarpeta ? '../../carrito/carrito.html' : '../carrito/carrito.html';
}

function cambiarCantidad(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    if (carrito.length === 0) descuentoPorcentaje = 0;
    guardarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    if (carrito.length === 0) descuentoPorcentaje = 0;
    guardarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    descuentoPorcentaje = 0;
    guardarCarrito();
}

function aplicarCupon() {
    const input = document.getElementById('inputCupon');
    if (!input) return;
    const codigo = input.value.trim().toUpperCase();

    if (codigo === 'OPTICA15' || codigo === 'GA15') {
        descuentoPorcentaje = 0.15;
        guardarCarrito();
        alert('¡Cupón del 15% de descuento aplicado!');
    } else {
        alert('Cupón no válido. Usa el código OPTICA15 para obtener tu 15% de descuento.');
    }
}

function actualizarVistaCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    const contenedorPagina = document.getElementById('vistaCarritoPagina');
    if (!contenedorPagina) return;

    const mainEl = contenedorPagina.closest('.carrito-page-main');

    if (carrito.length === 0) {
        if (mainEl) mainEl.classList.remove('sin-padding');
        contenedorPagina.innerHTML = `
            <div class="carrito-vacio-gmo">
                <h2>TU CARRITO ESTÁ VACÍO</h2>
                <a href="../inicio/index.html" class="btn-ir-comprar">
                    IR A COMPRAR <span>&rsaquo;</span>
                </a>
            </div>
        `;
        return;
    }

    if (mainEl) mainEl.classList.add('sin-padding');

    let subtotal = 0;
    const tarjetasHTML = carrito.map((item, index) => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        return `
            <div class="gmo-card-producto">
                <div class="gmo-card-img">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="gmo-card-info">
                    <div class="gmo-card-top">
                        <div>
                            <span class="gmo-categoria">${item.categoria || 'LENTES OFTÁLMICOS'}</span>
                            <h3 class="gmo-titulo-prod">${item.nombre}</h3>
                        </div>
                        <button type="button" class="gmo-btn-trash" onclick="eliminarProducto(${index})" title="Eliminar producto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                                <path d="M10 11v6"></path>
                                <path d="M14 11v6"></path>
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="gmo-card-bottom">
                        <div class="gmo-cantidad-box">
                            <span>Cantidad:</span>
                            <button type="button" onclick="cambiarCantidad(${index}, -1)">-</button>
                            <strong>${item.cantidad}</strong>
                            <button type="button" onclick="cambiarCantidad(${index}, 1)">+</button>
                        </div>
                        <div class="gmo-precio-prod">S/${totalItem.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const montoDescuento = subtotal * descuentoPorcentaje;
    const totalFinal = subtotal - montoDescuento;

    contenedorPagina.innerHTML = `
        <div class="gmo-carrito-layout">
            <div class="gmo-col-izquierda">
                <h1 class="gmo-titulo-pagina">Tu carrito</h1>
                <p class="gmo-subtitulo-pagina">Revisa los detalles y prepárate para el pago.</p>

                <div class="gmo-lista-cards">
                    ${tarjetasHTML}
                </div>

                <div class="gmo-limpiar-wrap">
                    <button type="button" class="gmo-btn-limpiar" onclick="limpiarCarrito()">
                        <span>&otimes;</span> LIMPIAR CARRITO
                    </button>
                </div>
            </div>

            <aside class="gmo-col-derecha">
                <h2 class="gmo-resumen-titulo">RESUMEN DEL PEDIDO</h2>

                <div class="gmo-resumen-fila">
                    <span>Subtotal:</span>
                    <span>S/${subtotal.toFixed(2)}</span>
                </div>

                <div class="gmo-resumen-fila">
                    <span>Descuento:</span>
                    <span class="gmo-texto-descuento">S/${montoDescuento.toFixed(2)}</span>
                </div>

                <div class="gmo-cupon-bloque">
                    <label for="inputCupon">¿Tienes un cupón de descuento?</label>
                    <p class="gmo-cupon-nota">
                        Recuerda que tienes un 15% DCTO suscribiéndote*. Usa el código <strong>OPTICA15</strong>.
                    </p>
                    <div class="gmo-cupon-form">
                        <input type="text" id="inputCupon" placeholder="Ingresa tu código">
                        <button type="button" onclick="aplicarCupon()">Aplicar</button>
                    </div>
                </div>

                <hr class="gmo-divisor">

                <div class="gmo-total-fila">
                    <span>Total estimado</span>
                    <strong>S/${totalFinal.toFixed(2)}</strong>
                </div>

                <button type="button" class="gmo-btn-pagar" onclick="finalizarCompra()">
                    PAGAR PEDIDO
                </button>

                <p class="gmo-legal">
                    Al hacer clic en uno de los botones anteriores, aceptas los
                    <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a> de Óptica G&A.
                </p>
            </aside>
        </div>
    `;
}

function finalizarCompra() {
    alert('¡Gracias por tu compra en Óptica G&A! Tu pedido ha sido procesado.');
    limpiarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
    actualizarVistaCarrito();

    // Conecta automáticamente cualquier botón .btn-select-lenses aunque haya quedado uno duplicado sin onclick
    document.querySelectorAll('.btn-select-lenses').forEach(function (boton) {
        if (!boton.getAttribute('onclick')) {
            boton.addEventListener('click', seleccionarProductoActual);
        }
    });
});

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    window.location.href = 'checkout.html';
}
// ==========================================
// LÓGICA DEL CHECKOUT ESTILO GMO - ÓPTICA G&A
// ==========================================
let carritoChk = JSON.parse(localStorage.getItem('carritoOpticaGA')) || [];
let descuentoChk = Number(localStorage.getItem('descuentoOpticaGA')) || 0;
let metodoEnvioActual = 'Envío a domicilio';

function cargarProductosCheckout() {
    const contenedor = document.getElementById('checkoutListaProductos');
    if (!contenedor) return;

    if (carritoChk.length === 0) {
        window.location.href = 'carrito.html';
        return;
    }

    let subtotal = 0;
    contenedor.innerHTML = carritoChk.map((item, idx) => {
        const totalProducto = item.precio * item.cantidad;
        subtotal += totalProducto;
        const codigoGic = 105635160 + idx;

        return `
            <div class="chk-item-card">
                <div class="chk-item-thumb">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <span class="chk-item-badge">${item.cantidad}</span>
                </div>
                <div class="chk-item-details">
                    <div class="chk-item-title">${item.nombre}</div>
                    <div class="chk-item-sku">GIC: ${codigoGic} • ${item.categoria || 'Lentes'}</div>
                </div>
                <div class="chk-item-price">S/ ${totalProducto.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    const montoDescuento = subtotal * descuentoChk;
    const totalFinal = subtotal - montoDescuento;

    document.getElementById('chkSubtotal').textContent = `S/ ${subtotal.toFixed(2)}`;

    const filaDesc = document.getElementById('filaDescuento');
    if (montoDescuento > 0) {
        filaDesc.style.display = 'flex';
        document.getElementById('chkDescuento').textContent = `- S/ ${montoDescuento.toFixed(2)}`;
    } else {
        filaDesc.style.display = 'none';
    }

    document.getElementById('chkTotal').textContent = `S/ ${totalFinal.toFixed(2)}`;
}

function activarBotonCupon() {
    const input = document.getElementById('chkInputCupon');
    const btn = document.getElementById('btnAplicarCupon');
    btn.classList.toggle('ready', input.value.trim().length > 0);
}

function aplicarCuponCheckout() {
    const codigo = document.getElementById('chkInputCupon').value.trim().toUpperCase();
    if (codigo === 'OPTICA15' || codigo === 'GA15') {
        descuentoChk = 0.15;
        localStorage.setItem('descuentoOpticaGA', '0.15');
        cargarProductosCheckout();
        alert('¡Cupón del 15% de descuento aplicado!');
    } else {
        alert('Código no válido. Ingresa OPTICA15 para aplicar tu 15% de descuento.');
    }
}

function toggleFactura() {
    const checked = document.getElementById('chkNecesitaFactura').checked;
    document.getElementById('bloqueFactura').style.display = checked ? 'grid' : 'none';
    document.getElementById('chkRuc').required = checked;
    document.getElementById('chkRazonSocial').required = checked;
}

function actualizarDistritos() {
    const depto = document.getElementById('chkDepartamento').value;
    const selectProvincia = document.getElementById('chkProvincia');
    const selectDistrito = document.getElementById('chkDistrito');

    if (depto === 'Callao') {
        selectProvincia.innerHTML = '<option value="Callao" selected>Callao</option>';
        selectDistrito.innerHTML = `
            <option value="">Seleccione</option>
            <option value="Callao">Callao</option>
            <option value="Bellavista">Bellavista</option>
            <option value="La Perla">La Perla</option>
            <option value="La Punta">La Punta</option>
            <option value="Ventanilla">Ventanilla</option>
        `;
    } else {
        selectProvincia.innerHTML = '<option value="Lima" selected>Lima</option>';
        selectDistrito.innerHTML = `
            <option value="">Seleccione</option>
            <option value="San Isidro">San Isidro</option>
            <option value="Miraflores">Miraflores</option>
            <option value="Santiago de Surco">Santiago de Surco</option>
            <option value="San Borja">San Borja</option>
            <option value="La Molina">La Molina</option>
            <option value="San Miguel">San Miguel</option>
            <option value="Jesús María">Jesús María</option>
            <option value="Los Olivos">Los Olivos</option>
        `;
    }
}

function seleccionarMetodoEnvio(tipo) {
    const esDomicilio = tipo === 'domicilio';
    metodoEnvioActual = esDomicilio ? 'Envío a domicilio' : 'Retiro en Tienda';

    document.getElementById('tabDomicilio').classList.toggle('active', esDomicilio);
    document.getElementById('tabTienda').classList.toggle('active', !esDomicilio);

    document.getElementById('boxEnvioRegular').style.display = esDomicilio ? 'flex' : 'none';
    document.getElementById('boxRetiroTienda').style.display = esDomicilio ? 'none' : 'flex';
}

function cambiarMetodoPago(tipo) {
    const esTarjeta = tipo === 'tarjeta';

    document.getElementById('headerTarjeta').classList.toggle('active', esTarjeta);
    document.getElementById('headerYape').classList.toggle('active', !esTarjeta);

    document.getElementById('bodyTarjeta').style.display = esTarjeta ? 'block' : 'none';
    document.getElementById('bodyYape').style.display = esTarjeta ? 'none' : 'block';

    document.getElementById('chkNumTarjeta').required = esTarjeta;
    document.getElementById('chkVencimiento').required = esTarjeta;
    document.getElementById('chkCvv').required = esTarjeta;
    document.getElementById('chkTitular').required = esTarjeta;
    document.getElementById('chkNumDocTitular').required = esTarjeta;
    document.getElementById('chkCodigoYape').required = !esTarjeta;
}

function formatearNumeroTarjeta(input) {
    let valor = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatearFechaExp(input) {
    let valor = input.value.replace(/\D/g, '').substring(0, 4);
    if (valor.length >= 3) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    input.value = valor;
}

function procesarPago(event) {
    event.preventDefault();

    const nombre = document.getElementById('chkNombre').value.trim();
    const apellidos = document.getElementById('chkApellidos').value.trim();
    const correo = document.getElementById('chkCorreo').value.trim();
    const tipoDoc = document.getElementById('chkTipoDoc').value;
    const numDoc = document.getElementById('chkNumDoc').value.trim();
    const esFactura = document.getElementById('chkNecesitaFactura').checked;
    const comprobante = esFactura
        ? `Factura (RUC: ${document.getElementById('chkRuc').value.trim()})`
        : 'Boleta de Venta Electrónica';

    const lugarEntrega = metodoEnvioActual === 'Envío a domicilio'
        ? `${document.getElementById('chkDireccion').value.trim()}, ${document.getElementById('chkDistrito').value}`
        : document.getElementById('chkSedeRecojo').value;

    const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    const totalPagado = document.getElementById('chkTotal').textContent;
    const codigoPedido = 'GA-' + Math.floor(100000 + Math.random() * 900000);

    // Vaciar carrito tras completar el pago
    localStorage.setItem('carritoOpticaGA', JSON.stringify([]));
    localStorage.setItem('descuentoOpticaGA', '0');

    document.getElementById('checkoutMain').style.display = 'none';
    const receipt = document.getElementById('confirmacionPedido');
    receipt.style.display = 'block';
    receipt.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-check">&#10003;</div>
            <div>
                <p style="font-size: 13px; color: #6b7280;">Orden #${codigoPedido}</p>
                <h2 style="font-size: 22px; color: #111827;">¡Gracias por tu compra, ${nombre}!</h2>
            </div>
        </div>

        <p style="font-size: 14px; color: #4b5563;">
            Hemos enviado la confirmación de tu pedido y tu comprobante al correo <strong>${correo}</strong>.
        </p>

        <div class="receipt-summary-card">
            <div class="receipt-line"><span>Cliente:</span><strong>${nombre} ${apellidos} (${tipoDoc}: ${numDoc})</strong></div>
            <div class="receipt-line"><span>Comprobante:</span><strong>${comprobante}</strong></div>
            <div class="receipt-line"><span>Entrega (${metodoEnvioActual}):</span><strong>${lugarEntrega}</strong></div>
            <div class="receipt-line"><span>Método de pago:</span><strong>${metodoPago}</strong></div>
            <div class="receipt-line"><span>Total pagado:</span><strong style="font-size: 16px; color: #15803d;">PEN ${totalPagado}</strong></div>
        </div>

        <div class="receipt-buttons">
            <a href="../inicio/index.html" class="btn-receipt-home">Volver a la tienda</a>
            <button type="button" class="btn-receipt-print" onclick="window.print()">Imprimir constancia</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', cargarProductosCheckout);