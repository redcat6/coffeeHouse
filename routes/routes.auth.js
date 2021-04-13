const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const router = Router();

//  /adm/register
router.post(
	'/register',
	[
		check('email', 'incorrect email format').isEmail(),
		check('password', 'empty password').notEmpty()
	],
	async (req, res) => {
		try {
			//validation user's data
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array(), message: 'Incorrect data of registration' });
			}

			const { email, password } = req.body;
			const candidate = await User.findOne({ email: email });
			if (candidate) {
				//the user already exists 
				return res.status(400).json({ message: "user with this email already exists" });
			}
			//нужно захешировать пароль bcryptjs
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({ email: email, password: hashedPassword });
			await user.save();
			res.status(201).json({ message: "user data have been saved" })

		}
		catch (err) {
			res.status(500).json({ message: "Server Error..." })
		}
	})

///adm/login
router.post(
	'/login',
	[
		check('email', 'please, enter the email correct').normalizeEmail().isEmail(),
		check('password', 'empty password').notEmpty()
	],
	async (req, res) => {
		try {
			//validation user's data
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				//no user 
				return res.status(400).json({ message: "no user with this email" });
			}

			//сверка паролей
			const matchPass = await bcrypt.compare(password, user.password);
			if (!matchPass) {
				res.status(400).json({ message: 'Incorrect password' });
			}
			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwtSecret'),
				{ expiresIn: "5h" }
			)

			res.json({ token, userId: user.id })
		}
		catch (err) {
			res.status(500).json({ message: "Server Error..." })
		}
	})
module.exports = router

