// Setting up config file
require('dotenv').config()
const app = require('./app/app')

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

// LISTEN V2
app.listen(process.env.PORT || 3200, () => {
  console.log(`Server started in ${process.env.PORT} mode.`);
});