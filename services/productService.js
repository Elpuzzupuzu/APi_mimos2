const Product = require('../models/Product');

exports.getAllProducts = async () => {
    return await Product.findAll();
};

exports.createProduct = async (data) => {
    return await Product.create(data);  // Asegúrate de que 'data' incluya 'img'
};


exports.getProductsForSlider = async (page, pageSize) => {
    const offset = (page - 1) * pageSize;  // Calcula el offset para la paginación
    const limit = pageSize;

    const { rows: products, count: totalItems } = await Product.findAndCountAll({
        offset,
        limit
    });

    return {
        products,  // Productos de la página actual
        totalItems,  // Número total de productos
        totalPages: Math.ceil(totalItems / pageSize),  // Total de páginas
        currentPage: page  // Página actual
    };
};