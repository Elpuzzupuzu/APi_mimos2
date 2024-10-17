const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/cart/:cartId/confirm-purchase', orderController.confirmPurchase);

module.exports = router;
