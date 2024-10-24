
const Product = require('../models/Product');

exports.getAllProducts = async () => {
    return await Product.findAll();
};


exports.getLimitEditionProducts = async () => {
    return await Product.findAll({
        where: {
            limit_edition: true
        }
    });
};






exports.createProduct = async (data) => {
    return await Product.create(data);  // Asegúrate de que 'data' incluya 'img'
};



exports.getProductById = async (productId) => {
    return await Product.findByPk(productId);
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



exports.getLimitEditionProducts = async (page, pageSize) => {
    const offset = (page - 1) * pageSize;  // Calcula el offset para la paginación
    const limit = pageSize;

    const { rows: products, count: totalItems } = await Product.findAndCountAll({
        where: {
            limit_edition: true  // Filtra solo los productos con limit_edition en true
        },
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








///------------------------------------------/////




// testing 

// En productService.js  YA ESTA LISTO 

exports.updateProductStock = async (productId, quantity) => {
    const product = await Product.findByPk(productId);
    if (product) {
        product.stock -= quantity; // Disminuir el stock
        product.sold += quantity; // Aumentar el contador de vendidos
        return await product.save(); // Guardar los cambios en la base de datos
    }
    throw new Error('Producto no encontrado');
};
