/* ***************************************************************************
******************************** USER PRODUCT ********************************
*************************************************************************** */
// MODELS
const Product = require('../models/Product')
// MIDDLEWARES ERRORS
const ErrorHandler = require('../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../middlewares/errors/catchAsyncErrors');


exports.getProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Produit non trouvé", 404));
    }
    
    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const productsCount = await Product.countDocuments();
    const products = await Product.find();

    res.status(201).json({
        success: true,
        productsCount,
        products
    })
})
