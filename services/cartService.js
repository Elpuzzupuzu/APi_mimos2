const Cart = require('../models/Cart');

exports.getCartByUserId = async (userId) => {
    return await Cart.findOne({ where: { id_user: userId } });
};

exports.createCart = async (data) => {
    return await Cart.create(data);
};


exports.emptyCart = async (userId) => {
    return await Cart.destroy({ where: { id_user: userId } });
};











