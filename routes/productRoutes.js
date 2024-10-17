const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getall', productController.getAllProducts);
router.post('/', productController.createProduct);

router.get('/slider', productController.getProductsForSlider);







module.exports = router;
