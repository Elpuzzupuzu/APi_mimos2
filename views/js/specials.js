let productosLE = []; // Almacena los productos obtenidos del backend

async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products/getallLE');
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();

        productosLE = products; // Guardar los productos
        // Aquí puedes manejar la lógica para mostrar todos los productos si lo deseas
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    let productosEnCarrito = JSON.parse(window.localStorage.getItem("productos-en-carrito")) || [];
    let currentPage = 1;
    const pageSize = 5;
    const numerito = document.getElementById('numerito');
    const prevBtn = document.getElementById('prev-btn2');
    const nextBtn = document.getElementById('next-btn2');
    const productsContainer = document.getElementById('products-container');
    const slider2 = document.getElementById('product-slider2');

    // Asegurarte que los elementos existan antes de manipularlos
    if (!numerito || !prevBtn || !nextBtn || !productsContainer || !slider2) {  // Verificación de slider2
        console.error('Algunos elementos del DOM no se encontraron.');
        return;
    }

    // Función para obtener productos limitados desde el backend
    async function fetchLimitEditionProducts(page) {
        try {
            const response = await fetch(`http://localhost:3000/api/products/limit-edition-slider?page=${page}&pageSize=${pageSize}`);
            if (!response.ok) throw new Error('Error al obtener los productos de edición limitada');
            const data = await response.json();

            // Renderizar los productos en el slider
            renderProducts(data.products);

            // Manejar botones de paginación
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage >= data.totalPages;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Renderizar los productos en el slider
    function renderProducts(products) {
        slider2.innerHTML = ''; // Usando slider2 en lugar de slider
    
        if (!products || products.length === 0) {
            slider2.innerHTML = '<p>No se encontraron productos.</p>'; // Usando slider2 aquí también
            return;
        }
    
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-itemLE');
            productDiv.innerHTML = `
                <div class="card-product">
                    <div class="container-img">
                        <img src="${product.img}" alt="Producto">
                        <span class="discount">-13%</span>
                        <div class="button-group">
                            <span><i class="fa-solid fa-eye"></i></span>
                            <span><i class="fa-regular fa-heart"></i></span>
                            <span><i class="fa-solid fa-code-compare"></i></span>
                        </div>
                    </div>
                    <div class="content-card-product">
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <h3>${product.name}</h3>
    
                        <button class="add-cart" id="${product.id_product}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button>
    
                        <button class="play-description" id="play-${product.id_product}">
                            <i class="fa-solid fa-volume-high"></i> Escuchar descripción
                        </button>
    
                        <p class="price">$${product.price} <span></span> </p>
                        <br>
                        <p class="stock">${product.stock} en stock</p>
                    </div>
                </div>
            `;
    
            slider2.appendChild(productDiv);
    
            // Evento para agregar el producto al carrito
            productDiv.querySelector('.add-cart').addEventListener('click', () => {
                agregarAlCarrito(product.id_product);
            });
    
            // Evento para reproducir la descripción del producto
            productDiv.querySelector(`#play-${product.id_product}`).addEventListener('click', () => {
                reproducirDescripcion(product.description);
            });
        });
    }
    
    // Función para reproducir la descripción usando ResponsiveVoice
    function reproducirDescripcion(description) {
        responsiveVoice.speak(description, "Spanish Latin American Female", { rate: 1 });
    }

    // Función para agregar al carrito
    function agregarAlCarrito(productId) {
        const productoAgregado = productosLE.find(producto => producto.id_product === productId);

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
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.sold, 0);
        numerito.innerText = nuevoNumerito;
    }

    // Botones de paginación
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchLimitEditionProducts(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        currentPage++;
        fetchLimitEditionProducts(currentPage);
    });

    // Cargar la primera página de productos limitados al inicio
    fetchLimitEditionProducts(currentPage);
});
