const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const app = express();
// parse application/json
app.use(express.json({ extended: true }));//middleware for parsing

const PORT = config.get('port');

//routes
//app.use(express.static('client/public'));
app.use('/', require('./routes/routes.home'));
app.use('/adm/orders', require('./routes/routes.orders'));
app.use('/adm/coffees', require('./routes/routes.coffees'));
app.use('/adm', require('./routes/routes.auth'));
//console.log(__dirname);

//чтобы пользоваться синтаксисом async/await оборачиваем в function
async function init() {
	try {
		//mongoose.connect возвращает promise
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
	}
	catch (err) {
		console.log(`Server error: ${err}`);
		process.exit(1);
	}
}

init();