/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
// MODELS
const Product = require('../../models/Product')
// MIDDLEWARES ERRORS
const ErrorHandler = require('../../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../../middlewares/errors/catchAsyncErrors');


exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    // Chope ID de l'User, donc obligé de se loguer pour add a product
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })
})
