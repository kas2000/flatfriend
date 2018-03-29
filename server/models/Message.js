var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Message = mongoose.Schema({
	to: String,
    text: String,
    //populate
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},	
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', Message);


