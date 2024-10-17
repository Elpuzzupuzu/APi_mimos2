const Cart = require('../models/Cart');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.confirmPurchase = async (cartId) => {
    const cart = await Cart.findByPk(cartId, {
        include: ['user', 'cartItems'] // Asegurarse de traer los productos en el carrito
    });

    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    // Crear una nueva orden
    const order = await Order.create({
        id_user: cart.id_user,
        date: new Date(),
        status: 'CONFIRMED'
    });

    // Transferir productos del carrito a la orden
    for (let cartItem of cart.cartItems) {
        // Obtener el precio actual del producto
        const product = await Product.findByPk(cartItem.id_product);
        
        // Crear el OrderItem
        await OrderItem.create({
            id_order: order.id_order,
            id_product: cartItem.id_product,
            quantity: cartItem.quantity,
            price: product.price
        });

        // Opcional: Actualizar stock del producto
        product.stock -= cartItem.quantity;
        await product.save();
    }

    // Vaciar el carrito después de confirmar la compra
    await cart.destroy();

    return order;
};
