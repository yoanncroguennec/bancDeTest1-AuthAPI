/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const Product = require('../../models/Product')


exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}
