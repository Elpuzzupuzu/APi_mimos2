let productos = []; // Almacena los productos obtenidos del backend
async function getAllProducts() {

    try {
        const response = await fetch('https://mimitos.onrender.com/api/products/getall');
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();

        productos = products; // Guardar los productos
        //displayProducts(products);    <<<------LOGICA QUE SE ESTA TESTEANDO DEL SLIDER
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

getAllProducts();

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    let productosEnCarrito = JSON.parse(window.localStorage.getItem("productos-en-carrito")) || [];
    let currentPage = 1;
    const pageSize = 5;
    const numerito = document.getElementById('numerito');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const productsContainer = document.getElementById('products-container');
    const slider = document.getElementById('product-slider');

    // Asegurarte que los elementos existan antes de manipularlos
    if (!numerito || !prevBtn || !nextBtn || !productsContainer || !slider) {
        console.error('Algunos elementos del DOM no se encontraron.');
        return;
    }

    // Función para obtener productos desde el backend

    async function fetchProducts(page) {
        try {
            const response = await fetch(`https://mimitos.onrender.com/api/products/slider?page=${page}&pageSize=${pageSize}`);
            if (!response.ok) throw new Error('Error al obtener los productos');
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
        slider.innerHTML = '';
    
        if (!products || products.length === 0) {
            slider.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }
    
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <div class="card-product">
                    <div class="container-img">
                        <img src="${product.img}" alt="Producto">
                        <span class="discount">-13%</span>
                        <div class="button-group">
                            <!-- Icono del ojo con data-product-id -->
                            <span class="view-details" data-product-id="${product.id_product}">
                                <i class="fa-solid fa-eye"></i>
                            </span>
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
    
            slider.appendChild(productDiv);
    
            // Evento para agregar el producto al carrito
            productDiv.querySelector('.add-cart').addEventListener('click', () => {
                agregarAlCarrito(product.id_product);
            });
    
            // Evento para reproducir la descripción del producto
            productDiv.querySelector(`#play-${product.id_product}`).addEventListener('click', () => {
                reproducirDescripcion(product.description);
            });
    
            // Evento para redirigir a la página de detalles del producto
            productDiv.querySelector('.view-details').addEventListener('click', () => {
                window.location.href = `producto.html?productId=${product.id_product}`;
            });
        });
    }
    
    
    // Función para reproducir la descripción usando ResponsiveVoice
    function reproducirDescripcion(description) {
        responsiveVoice.speak(description, "Spanish Latin American Female", { rate: 1 });
    }
    
    



    

    /// FIN DEL SLIDER PARA REDENDERIZAR ///

    
    // PARTE LOGICA DEL CARRITO //




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
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.sold, 0);
        numerito.innerText = nuevoNumerito;
    }

    // Botones de paginación
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchProducts(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        currentPage++;
        fetchProducts(currentPage);
    });

    // Cargar la primera página y todos los productos al inicio
    fetchProducts(currentPage);
    // getAllProducts();  <----- la logica de esto debe estar aparte :)
});
