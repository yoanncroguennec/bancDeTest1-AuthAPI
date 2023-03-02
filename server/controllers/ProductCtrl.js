/* ***************************************************************************
******************************** USER PRODUCT ********************************
*************************************************************************** */
const Product = require('../models/Product')
//
const ErrorHandler = require("../utils/errorHandler")


exports.getProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    // if(!product) {
    //     return next(new ErrorHandler("Produit non trouvé", 404));
    // }

    if(!product) return res.status(201).json({
        success: false,
        message: "Produit non trouvé."
    })

    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req, res, next) => {
    const productsCount = await Product.countDocuments();
    const products = await Product.find();

    res.status(201).json({
        success: true,
        productsCount,
        products
    })
}
