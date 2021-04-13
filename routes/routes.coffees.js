const { Router } = require('express');
const Coffees = require('../models/Coffees.js');
const router = Router();
const auth = require('../middleware/auth.middleware');

//adm/coffees/ - 
router.post('/', auth, async (req, res) => {
	try {
		const { coffee, price } = req.body
		//validation to do
		const item = new Coffees({ coffee, price });
		await item.save();
		res.status(201).json(item);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
//adm/coffees/delete - 
router.post('/delete', auth, async (req, res) => {
	try {
		const del = await Coffees.findOneAndDelete({ _id: req.body.id });
		res.json(del);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
})
//adm/coffees
router.get('/', auth, async (req, res) => {
	try {
		const coffees = await Coffees.find({});//
		res.json(coffees);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
});
module.exports = router

