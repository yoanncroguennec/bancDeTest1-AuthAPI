const express = require('express')
const router = express.Router();

/* ****************************************************************
******************************* USER ******************************
**************************************************************** */
const {
    getProduct,
    getAllProducts,
} = require('../controllers/ProductCtrl')
/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const {
    newProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/admin/ProductCtrl_Admin')
// MIDDLEWARES
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth/auth');



router.route('/')
    .post(isAuthenticatedUser, newProduct)
    .get(isAuthenticatedUser, getAllProducts);

router.route('/:id')
    .get(getProduct);

router.route('/admin/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;