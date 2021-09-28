const express = require('express');
const cors = require('cors');
const User = require('./models/User');

require('dotenv').config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

app.use(async (req, res, next) => {
	const user = await User.findOne({ id: req.body.owner });
	req.user = user;
	next();
});

const cartController = require('./controllers/carts');
app.use('/api/cart', cartController);
const authController = require('./controllers/auth');
app.use('/auth', authController);
const productController = require('./controllers/products');
app.use('/api/products', productController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on ${port}`));
