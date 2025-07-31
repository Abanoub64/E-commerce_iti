const mongoose = require("mongoose"); // Importing mongoose library


const orderSchema = new mongoose.Schema({

productId:{
    type: String,
    required: true,
},
userId:{
    type: String,
    required: true,
},
orderDate:{
    type: Date,
    default: Date.now
},
orderStatus: {
    type: String,
    required: true,
},
totalAmount:{
    type: String,
    required: true,
},
image:{
    type: String,
}

})
module.exports = mongoose.model("Order", orderSchema); // Exporting the model