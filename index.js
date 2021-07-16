const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const app = express();

// require('./middleware/passport')(passport)

app.use(
	session({
		secret: 'dog',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

app.use(async (req, res, next) => {
	const user = await User.findOne({ id: req.session.userID });
	req.user = user;
	next();
});

// Controllers
// const userController = require('./controllers/users');
// app.use('/api/user', userController);
const cartController = require('./controllers/carts');
app.use('/api/cart', cartController);
const authController = require('./controllers/auth');
app.use('/auth', authController);
const productController = require('./controllers/products');
app.use('/api/products', productController);
// const paymentController = require('./controllers/stripe');
// app.use('/api/stripe', paymentController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on ${port}`));
