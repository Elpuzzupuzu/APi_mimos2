// Verificar si el usuario está autenticado
// const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// if (!userInfo) {
//     // Si el usuario no está autenticado, eliminar userCart y productos-en-carrito de localStorage
//     localStorage.removeItem('userCart');
//     localStorage.removeItem('productos-en-carrito');
    
//     // Redirigir a la página de inicio de sesión
//     window.location.href = 'login.html';
// }

// Continuar con el resto del código solo si el usuario está autenticado

//---------------------------AQUI SE OBTIENE EL CARRITO DE LA COMPRA ACTUAL----------------------------------------------//


const productosEncarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));


//---------------------------------------------------------------------------------//

console.log(productosEncarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botoVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Funciones

function cargarProductosCarrito() {
    if (productosEncarrito && productosEncarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEncarrito.forEach(producto => {
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

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = parseInt(e.currentTarget.id); // Convertir el id a entero si es necesario
    const index = productosEncarrito.findIndex(producto => producto.id === idBoton);

    productosEncarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEncarrito));
}

// Botón vaciar carrito

botoVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEncarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEncarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEncarrito.reduce((acc, producto) => acc + (producto.price * producto.sold), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

// Botón comprar carrito
botonComprar.addEventListener("click", comprarCarrito);



///  ESTA ES LA LOGICA QUE FALTA POR ACTUALIZAR

/// la logica a solucionar es obtener el carrito y crearlo uno a cada usuario 



async function comprarCarrito() {
    const userCart = JSON.parse(localStorage.getItem('userCart'));  //<----- aqui vamos a trabajar 
    if (!userCart || !userCart.cartId) {
        console.error('No se encontró el ID del carrito en localStorage');
        alert('Hubo un problema al obtener el ID del carrito. Por favor, intenta más tarde.');
        return;
    }

    const cartId = userCart.cartId;

    try {
        // Iterar sobre cada producto y enviar una solicitud para agregarlo al carrito
        for (let producto of productosEncarrito) {
            const productId = producto.id;
            const quantity = producto.sold;

            const response = await fetch('http://localhost:8080/cart-items/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    cartId: cartId,
                    productId: productId,
                    quantity: quantity
                })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto al carrito');
            }

            const result = await response.json();
            console.log('Producto agregado exitosamente:', result);
        }

        // Después de agregar todos los productos al carrito, proceder con la compra
        const purchaseResponse = await fetch('http://localhost:8080/products/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productosEncarrito)
        });

        if (!purchaseResponse.ok) {
            throw new Error('Error en la compra');
        }

        const data = await purchaseResponse.text();
        console.log('Success:', data);
        productosEncarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEncarrito));
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al procesar la compra. Por favor, intenta más tarde.');
    }
}
