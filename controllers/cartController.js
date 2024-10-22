const cartService = require('../services/cartService');
const productService = require('../services/productService');

exports.getCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await cartService.getCartByUserId(userId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// testing

exports.purchaseCart = async (req, res) => {
    const { userId } = req.params; // Obtener el userId de los parámetros
    const productosEnCarrito = req.body.productosEnCarrito; // Obtener el carrito del cuerpo de la solicitud

    try {
        // Procesar cada producto en el carrito
        for (const producto of productosEnCarrito) {
            // Obtener el producto por ID
            const product = await productService.getProductById(producto.id_product); // Ajustar según tu servicio
            
            if (!product) {
                return res.status(404).json({ error: `Producto con ID ${producto.id_product} no encontrado` });
            }

            // Verificar que hay suficiente stock
            if (product.sold <= product.stock) { // ya se verifica que el stock sea suficiente
                // Actualizar el stock y el contador de vendidos
                await productService.updateProductStock(producto.id_product, producto.sold); // Actualizar el stock por 1 unidad
            } else {
                return res.status(400).json({ error: `No hay suficiente stock para el producto ${producto.name}` });
            }
        }

        // Vaciar el carrito
        await cartService.emptyCart(userId); // Vaciar el carrito

        res.status(200).json({ message: 'Compra realizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

