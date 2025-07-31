const mongoose = require("mongoose"); // Importing mongoose library


const productSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,
},
Price:{
    type: String,
    required: true,
},
desc: {
    type: Date,
    default: Date.now
},
seller:{
    type: String,
    required: true,
},
image:{
    type: String,
}

})
module.exports = mongoose.model("Product", productSchema); // Exporting the model