const mongoose = require('mongoose');
// const mongoose: any = require('mongoose');
require('dotenv').config();

const mongoURI =
	'mongodb+srv://ecom:UKXjGVVkDbCZALln@cluster0.7ujlv.mongodb.net/ecomDB?retryWrites=true&w=majority';

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
