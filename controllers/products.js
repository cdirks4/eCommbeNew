const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', (req, res, next) => {
	Product.find().then((prod) => res.json(prod));
});
router.get('/:category', (req, res, next) => {
	Product.find({ category: req.params.category }).then((prod) =>
		res.json(prod)
	);
});
module.exports = router;
