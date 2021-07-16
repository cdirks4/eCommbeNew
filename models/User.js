const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	displayName: {
		type: String,
		required: true,
	},
	googleId: {
		type: String,
		required: true,
	},
	googlePicture: String,
	email: String,
	purchased: [String],
});
//POPULATE MONGOOSE
const User = mongoose.model('User', UserSchema);

module.exports = User;
