var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
	text: String,
	firstname: String,
	email: String,
	flat: {type: mongoose.Schema.ObjectId, ref: "Flat"},
    user: { type: mongoose.Schema.ObjectId, ref: "User"},
	date: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Comment', commentSchema);
