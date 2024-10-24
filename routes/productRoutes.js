const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getall', productController.getAllProducts);
router.post('/', productController.createProduct);

router.get('/slider', productController.getProductsForSlider);
router.get('/limit-edition-slider',productController.getLimitEditionSlider);
router.get('/getallLE',productController.getLimitEditionProducts);






module.exports = router;
