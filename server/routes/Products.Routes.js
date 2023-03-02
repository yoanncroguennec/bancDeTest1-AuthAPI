const express = require('express')
const router = express.Router();

/* ****************************************************************
******************************* USER ******************************
**************************************************************** */
const {
    getProduct,
    getAllProducts
} = require('../controllers/ProductCtrl')
/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const {
    newProduct
} = require('../controllers/admin/ProductCtrl_Admin')



router.route('/')
    .post(newProduct)
    .get(getAllProducts);

router.route('/:id')
    .get(getProduct);

module.exports = router;