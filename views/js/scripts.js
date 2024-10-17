const productForm = document.getElementById('productForm');
const fetchProductsButton = document.getElementById('fetchProducts');
const productsList = document.getElementById('productsList');

// Función para crear un producto
productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const productData = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value, 10),
        img: document.getElementById('img').value,
        description: document.getElementById('description').value,
        season: document.getElementById('season').value,
        limit_edition: false,
        sold: 0,
        id_category: 1, // Ajusta este valor según tu lógica
        available: true
    };

    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }

        const result = await response.json();
        alert(`Producto creado con éxito: ${result.name}`);
        productForm.reset(); // Reinicia el formulario
    } catch (error) {
        alert(error.message);
    }
});

// Función para obtener todos los productos
fetchProductsButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');

        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        alert(error.message);
    }
});

// Función para mostrar productos en la lista
function displayProducts(products) {
    productsList.innerHTML = ''; // Limpia la lista anterior
    if (products.length === 0) {
        productsList.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <img src="${product.img}" alt="${product.name}" style="max-width: 100px; height: auto;">
            <p>Descripción: ${product.description}</p>
            <p>Temporada: ${product.season}</p>
            <p>Fecha de venta: ${new Date(product.date_on_sale).toLocaleDateString()}</p>
            <hr>
        `;
        productsList.appendChild(productDiv);
    });
}
