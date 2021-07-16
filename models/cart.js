const mongoose = require('../db/connection');

const CartSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		products: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Product',
		},
		purchased: [
			{
				product: {
					type: [mongoose.Schema.Types.ObjectId],
					ref: 'Product',
				},
				date: Date,
			},
		],
	},
	{ timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
//POPULATE MONGOOSE REF PRODUCTS
