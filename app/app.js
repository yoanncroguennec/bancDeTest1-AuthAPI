const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

// Create server, it's the variable "app" 
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

// ROUTES
app.get("/", (req, res) => {
  res.json({message : "Full Project 1 - API Ecommerce MERN - Pizzeria"});
});
// app.use('/api/products', require('../server/routes/Products.Routes'))
// app.use('/api/restaurant', require('../server/routes/Restaurants.Routes'))

module.exports = app