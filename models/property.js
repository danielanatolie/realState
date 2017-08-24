var mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Property", propertySchema);