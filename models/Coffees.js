const { Schema, model } = require("mongoose");

const schema = new Schema({
	coffee: { type: String, required: true },
	price: { type: Number, required: true }
});

module.exports = model('Coffee', schema);
