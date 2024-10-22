
    // Obtener el carrito de la compra actual
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

// Contenedores y elementos de UI
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Cargar productos en el carrito
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = ` 
                <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.name}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.name}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.sold}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>precio</small>
                    <p>${producto.price}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>subtotal</small>
                    <p>${producto.price * producto.sold}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

// Cargar productos al iniciar
cargarProductosCarrito();

// Función para actualizar los botones de eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(e) {
    const idBoton = parseInt(e.currentTarget.id); // Convertir el id a entero si es necesario
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Botón para vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

// Función para actualizar el total
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.price * producto.sold), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

// Función para manejar la compra
async function comprarCarrito() {
    const userId = localStorage.getItem("id_user"); // Obtener el userId desde localStorage

    if (!userId) {
        alert("No se encontró el ID de usuario. Inicia sesión para continuar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/cart/${userId}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productosEnCarrito: productosEnCarrito
            })
        });

        if (response.ok) {
            // Si la compra fue exitosa, vaciar el carrito en la interfaz
            localStorage.removeItem("productos-en-carrito");
            cargarProductosCarrito();
            contenedorCarritoComprado.classList.remove("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            alert("Compra realizada con éxito");

                        // Limpiar el carrito después de la compra
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            // Actualizar la UI
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");


        } else {
            const errorData = await response.json();
            alert(`Error al realizar la compra: ${errorData.error}`);
        }
    } catch (error) {
        alert(`Error en el servidor: ${error.message}`);
    }




}

// Asignar la función al botón de comprar
botonComprar.addEventListener("click", comprarCarrito);

