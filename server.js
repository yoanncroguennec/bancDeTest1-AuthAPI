require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const connectDatabase = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.DB_URI);
		console.log("connect DB ");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
connectDatabase();

// ROUTES
app.get("/", (req, res) => {
  res.json({message : "Full Project 1 - API Ecommerce MERN - Pizzeria"});
});

// Northflank va nous fournir une variable process.env.PORT
// if (process.env.PORT) {
//   app.listen(process.env.PORT, () => {
//     console.log("Server started");
//   });
// } else {
//   app.listen(3200, () => {
//     console.log("Server started");
//   });
// }

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");
});