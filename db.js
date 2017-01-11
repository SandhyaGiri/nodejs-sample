var mongoose = require('mongoose');

mongoose.connect('mongodb://sagiri:sand1293@ds127988.mlab.com:27988/sandhya-node');

module.exports = mongoose.connection;