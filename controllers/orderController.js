const orderService = require('../services/orderService');

exports.confirmPurchase = async (req, res) => {
    const { cartId } = req.params;
    
    try {
        const order = await orderService.confirmPurchase(cartId);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
