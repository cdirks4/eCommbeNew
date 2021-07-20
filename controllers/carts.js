const express = require('express');
const { populate } = require('../models/Cart');

const Cart = require('../models/Cart');
const router = express.Router();

// viewCart
router.get('/:id', (req, res, next) => {
	Cart.findOne({ owner: req.params.id })
		.populate('products')
		.populate('purchased.product')
		.exec()
		.then((cart) => res.json(cart));
});
// handleAdd
router.post('/', async (req, res, next) => {
	///finding the users cart and populating the products
	///if a cart is not found creating a cart for the user and adding the product they clickd
	try {
		const found = await Cart.findOne({ owner: req.body.owner })
			.populate('products')
			.exec();
		if (!found) {
			const newCart = await Cart.create(req.body);
			return res.json(newCart);
		} else {
			found.products.push(req.body.products);
			found.paid = req.body.paid;
			found.save();
			res.json(found);
		}
	} catch {}
});
router.patch('/:id', async (req, res, next) => {
	try {
		let cart = await Cart.findOne({
			_id: req.params.id,
		})
			.populate('products')
			.exec();
		if (!cart) throw new Error('No user logged in!');
		const index = cart.products.map((prod) => prod.id).indexOf(req.body.index);
		cart.products.splice(index, 1);
		cart.save();
		res.json(cart);
	} catch (error) {
		res.json(error);
	}
});
router.put('/:id', async (req, res, next) => {
	try {
		let cart = await Cart.findOne({ _id: req.params.id });
		if (!cart) throw new Error('Cart not found');
		cart.products.push(req.body.prod_id);
		let newCart = await Cart.findOne({ _id: req.params.id })
			.populate('products')
			.exec();
		cart.save();
		res.json(newCart);
	} catch (error) {
		res.json(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		cart = await Cart.findOneAndDelete({ owner: req.params.id });
		if (!cart) throw new Error('Cart not found');
	} catch (error) {
		res.json(error);
	}
});
router.post('/checkout/:id', async (req, res, next) => {
	try {
		cart = await Cart.findOne({ owner: req.params.id })
			.populate('product')
			.populate('purchased.product')
			.exec();
		let purchased = {
			product: [],
			date: cart.updatedAt,
		};
		cart.products.forEach((prod) => {
			purchased.product.push(prod);
		});

		cart.purchased.push(purchased);
		cart.products = [];
		cart.save();
	} catch (error) {}
});
module.exports = router;
