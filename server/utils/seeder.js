require("dotenv").config();

// CONNECT DB
const mongoose = require("mongoose");
const connectDatabase = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.DB_URI);
		console.log("Connect MongoDB folder1_ecommercePizzeriaPortfolio_Api");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
connectDatabase();

//  SERVER MODELS
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
// UTILS DATAS JSON
const products = require('./data/products.json');
const restaurant = require('./data/restaurants.json');

const seeder = async () => {
    try {
/* *******************************************************************
**************************** SEED PRODUCTS ***************************
******************************************************************** */
        await Product.deleteMany();
        console.log('Les produits ont été effacés');

        await Product.insertMany(products)
        console.log('Les produits ont été ajoutés')

/* *******************************************************************
************************** SEED RESTAURANTS **************************
******************************************************************** */
        await Restaurant.deleteMany();
        console.log('Les restaurants ont été effacés');

        await Restaurant.insertMany(restaurant)
        console.log('Les restaurants ont été ajoutés')

/* *******************************************************************
************************** PROCESS EXIT **************************
******************************************************************** */
        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seeder()
