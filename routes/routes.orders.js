const { Router } = require('express');
const Order = require('../models/Order.js');
const Coffees = require('../models/Coffees.js');
const router = Router();
const auth = require('../middleware/auth.middleware');

//adm/orders/ - users
router.post('/', async (req, res) => {
	try {
		const { userName, phone, order, suma } = req.body
		//validation to do
		const ord = new Order({ userName, phone, order, suma });
		await ord.save();
		res.status(201).json(ord);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
//adm/orders
router.get('/', auth, async (req, res) => {
	try {
		const orders = await Order.find({ fullfilled: false });//
		res.json(orders);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
});
//adm/orders/orderId
router.get('/:id', auth, async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		res.json(order);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
});
router.post('/fullfill', auth, async (req, res) => {

	try {
		//const doc = await Order.findById(req.body.id);
		//doc.fullfilled = true;
		//doc.manager = req.user.userId;
		//doc.fullfillData = Date.now();
		//const order = await doc.save();
		const order = await Order.findByIdAndUpdate(req.body.id, {
			fullfilled: true, manager: req.user.userId,
			fullfillData: Date.now()
		})
		res.json(order);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
router.delete('/deleteItem', auth, async (req, res) => {
	try {
		const doc = await Order.findById(req.body.orderId);
		const coffee = await Coffees.findOne({ coffee: req.body.key });
		const num = parseInt(doc.order.get(req.body.key));
		doc.suma -= num * coffee.price;
		doc.order = req.body.newOrder;
		const ord = await doc.save();
		res.json(ord);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
router.delete('/delete', auth, async (req, res) => {

	try {
		const doc = await Order.findByIdAndDelete(req.body.id);
		res.json(doc);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
router.post('/update', auth, async (req, res) => {
	//console.log(req.body)
	try {
		const doc = await Order.findById(req.body.orderId);
		const coffee = await Coffees.findOne({ coffee: req.body.coffee });
		const oldNum = doc.order.get(req.body.coffee);
		doc.suma += (parseInt(req.body.num) * coffee.price - oldNum * coffee.price);
		doc.order.set(req.body.coffee, parseInt(req.body.num))
		const ord = await doc.save();
		res.json(ord);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})

module.exports = router

