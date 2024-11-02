const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getall', productController.getAllProducts);
router.post('/', productController.createProduct);

router.get('/slider', productController.getProductsForSlider);
router.get('/limit-edition-slider',productController.getLimitEditionSlider);
router.get('/getallLE',productController.getLimitEditionProducts);
router.get('/:id', productController.getProductById);  // esta ruta entra en conflicto siempre hay que tener en cuenta las rutas 







module.exports = router;
