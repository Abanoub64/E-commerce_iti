const mongoose = require("mongoose"); // Importing mongoose library


const subscriberSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now
},
seller:{
    type: String,
    required: true,
}

})
module.exports = mongoose.model("Subscriber", subscriberSchema); // Exporting the model