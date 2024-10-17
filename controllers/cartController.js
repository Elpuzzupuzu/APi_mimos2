const cartService = require('../services/cartService');

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
