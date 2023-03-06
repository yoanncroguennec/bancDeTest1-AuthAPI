const express = require('express');
// "body-parser" la même chose que "express"
const bodyParser = require('body-parser')
const cors = require('cors')
// For auth
const cookieParser = require('cookie-parser')
// For auth & resturants & products
const fileUpload = require('express-fileupload')


// Create server, it's the variable "app" 
const app = express();

// MIDDLEWARES
app.use(express.json());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
// For auth
app.use(cookieParser())
// For auth & resturants & products
app.use(fileUpload());

// SERVER MIDDLEWARES EERORS
const errorMiddleware = require("../server/middlewares/errors/errors")
// Middleware to handle errors (Try/Catch)
app.use(errorMiddleware)

// Setting up cloudinary configuration
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ROUTES
app.get("/", (req, res) => {
  res.json({message : "Full Project 1 - API Ecommerce MERN - Pizzeria"});
});
app.use('/api/auth', require('../server/routes/Auth.Routes'))
app.use('/api/users', require('../server/routes/Users.Routes'))
app.use('/api/products', require('../server/routes/Products.Routes'))
app.use('/api/restaurants', require('../server/routes/Restaurants.Routes'))


module.exports = app