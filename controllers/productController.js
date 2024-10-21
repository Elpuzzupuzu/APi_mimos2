const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);  // Asegúrate de enviar el campo 'img'
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductsForSlider = async (req, res) => {
    try {
        // Obtener parámetros de paginación (número de página y cantidad de productos por página)
        const page = parseInt(req.query.page) || 1;  // Página actual, por defecto 1
        const pageSize = parseInt(req.query.pageSize) || 5;  // Productos por página, por defecto 5

        const products = await productService.getProductsForSlider(page, pageSize);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// cartController.js


