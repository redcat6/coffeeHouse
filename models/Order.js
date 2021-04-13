const { Schema, model } = require("mongoose");

const schema = new Schema({
	userName: { type: String, required: true },
	phone: { type: String, required: true },
	order: { type: Map, required: true },
	data: { type: Date, default: Date.now },
	fullfilled: { type: Boolean, default: false },
	fullfillData: { type: Date, default: '' },
	manager: { type: String, default: '' },
	suma: { type: Number, required: true }
});

module.exports = model('Order', schema);
