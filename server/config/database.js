const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( () => console.log("Database connection established"))
    .catch( (error) => {
        console.log("Database connection not established")
        console.error(error);
        process.exit(1);
    })
}