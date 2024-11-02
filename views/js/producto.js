// Obtener el productId de la URL de manera dinámica
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId'); // Obtiene el ID del producto desde la URL
const apiUrl = `https://mimitos.onrender.com/api/products/${productId}`;

// Variables del carrito
let productos = [];  // Lista de productos para almacenar el producto cargado
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
let numerito;  // Declara numerito aquí para que sea accesible en todo el código

// Función para agregar al carrito
function agregarAlCarrito(productId) {
    const productoAgregado = productos.find(producto => producto.id_product === productId);

    if (productoAgregado) {
        const productoEnCarrito = productosEnCarrito.find(producto => producto.id_product === productId);

        if (productoEnCarrito) {
            productoEnCarrito.sold++;
        } else {
            productoAgregado.sold = 1;
            productosEnCarrito.push(productoAgregado);
        }

        saveLocalCarrito();
        actualizarNumerito();
    } else {
        console.error(`Producto con ID ${productId} no encontrado`);
    }
}

// Guardar el carrito en localStorage
const saveLocalCarrito = () => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

// Actualizar el número de productos en el carrito
function actualizarNumerito() {
    if (numerito) { // Verificar si numerito está definido
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.sold, 0);
        numerito.innerText = nuevoNumerito;
    } else {
        console.error('Elemento numerito no está definido.');
    }
}

// Función para obtener y renderizar el producto
async function fetchAndRenderProduct() {
    try {
        const response = await fetch(apiUrl);
        const product = await response.json();

        if (response.ok) {
            productos.push(product); // Agregar el producto a la lista de productos

            const productHtml = `
                <div class="breadcrumb">
                    <a href="index.html">Home</a> / <a href="#">${product.season}</a> / <a href="#">Plush Toys</a> / ${product.name}
                </div>

                <div class="product-container">
                    <div class="product-image">
                        <img src="${product.img}" alt="${product.name}">
                        <div class="thumbnail-images">
                            
                        </div>
                    </div>

                    <div class="product-details">
                        <h1>${product.name}</h1>
                        <span class="price">$${product.price.toFixed(2)}</span>

                        <div class="purchase-options">
                            <div class="availability">
                                <p>Collect in Store</p>
                                <p><span class="highlight">Ready to collect</span> Today if ordered within 3 hours</p>
                            </div>

                            <div class="delivery">
                                <p>Delivery</p>
                                <p><span class="highlight">Historia:</span> ${product.description}</p>
                            </div>

                            <div class="shipping-estimation">
                                <label for="postcode">Shipping Estimation</label>
                                <input type="text" id="postcode" placeholder="E.g. 2100">
                            </div>

                            <div class="purchase-buttons">
                                <button class="add-to-cart" data-product-id="${product.id_product}">Add to Cart</button>
                            </div>
                        </div>

                        <div class="payment-options">
                            <h4>Pay Now</h4>
                            <img src="../img/payment.png" alt="Visa">    
                            <img src="mastercard.png" alt="Mastercard">
                            <img src="paypal.png" alt="PayPal">
                            <img src="applepay.png" alt="Apple Pay">
                        </div>
                    </div>
                </div>
            `;

            // Insertar el HTML dinámico en el contenedor principal
            document.querySelector('.product-page').innerHTML = productHtml;

            // Añadir evento para el botón de agregar al carrito
            document.querySelector('.add-to-cart').addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                agregarAlCarrito(productId);
            });

        } else {
            console.error('Producto no encontrado:', product.message);
            document.querySelector('.product-page').innerHTML = `<p>Producto no encontrado</p>`;
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        document.querySelector('.product-page').innerHTML = `<p>Error al cargar el producto</p>`;
    }
}

// Llamar a la función para obtener y mostrar el producto
document.addEventListener('DOMContentLoaded', () => {
    numerito = document.getElementById('numerito'); // Asignar el elemento aquí
    fetchAndRenderProduct();
});
