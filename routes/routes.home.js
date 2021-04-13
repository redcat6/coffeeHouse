const { Router } = require('express');
const Coffees = require('../models/Coffees.js');
const router = Router();

router.get('/modal', async (req, res) => {
	try {
		const coffees = await Coffees.find({});//
		//console.log(coffees);
		res.json(coffees);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
});

router.get('/menu', async (req, res) => {
	try {
		const coffees = await Coffees.find({});//
		res.json(coffees);
	}
	catch (err) {
		res.status(500).json({ message: 'An error occurred' })
	}
});

module.exports = router

