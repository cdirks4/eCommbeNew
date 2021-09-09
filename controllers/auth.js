const express = require('express');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

router.post('/google/', async (req, res, next) => {
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const { name, email, picture, sub } = ticket.getPayload();

	const user = await User.updateOne(
		{ googleId: sub },
		{
			googleId: sub,
			displayName: name,
			googlePicture: picture,
			email: email,
		},
		{ upsert: true }
	);
	req.session.userId = user.id;

	User.findOne({ displayName: name }).then((foundUser) => res.json(foundUser));
	res.status(201);
});
router.get('/client', (req, res, next) => {
	res.json(process.env.GOOGLE_CLIENT_ID);
});

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
