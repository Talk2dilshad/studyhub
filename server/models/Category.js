const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String,
    },
    courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Courses",
		},
	],

})


module.exports = mongoose.model("Category",CategorySchema)