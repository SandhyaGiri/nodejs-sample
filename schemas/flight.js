var mongoose = require('mongoose');

module.exports = mongoose.model('Flight', {
	number: Number,
	origin: String,
	destination: String,
	departs: String,
	arrives: String,
	departedAt: Number,
	arrivedAt: Number
});