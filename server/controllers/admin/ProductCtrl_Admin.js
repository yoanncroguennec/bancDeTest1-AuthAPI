/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const Product = require('../../models/Product')


exports.newProduct = async (req, res, next) => {

    // Chope ID de l'User, donc obligé de se loguer pour add a product
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // let images = []
    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images)
    // } else {
    //     images = req.body.images
    // }

    // if (images !== undefined) {

    //     // Deleting images associated with the product
    //     for (let i = 0; i < product.images.length; i++) {
    //         const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    //     }

    //     let imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: 'products'
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url
    //         })
    //     }

    //     req.body.images = imagesLinks
    // }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product
    })

}

exports.deleteProduct = async (req, res, next) => {

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
}
