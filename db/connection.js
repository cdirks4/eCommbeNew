const mongoose = require('mongoose');
// const mongoose: any = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_URL;

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((instance) =>
		console.log(`Connected to db: ${instance.connections[0].name}`)
	)
	.catch(console.error);

module.exports = mongoose;
