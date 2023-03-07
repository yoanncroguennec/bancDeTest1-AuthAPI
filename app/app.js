const express = require('express');
const cors = require('cors')
// For auth
const cookieParser = require('cookie-parser')

// Create server, it's the variable "app" 
const app = express();

// MIDDLEWARES
app.use(express.json());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
// For auth
app.use(cookieParser())

// ROUTES
app.get("/", (req, res) => {
  res.json({message : "Full Project 1 - API Ecommerce MERN - Pizzeria"});
});
app.use('/api/auth', require('../server/routes/Auth.Routes'))
app.use('/api/users', require('../server/routes/Users.Routes'))


module.exports = app