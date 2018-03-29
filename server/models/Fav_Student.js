var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var fav_studentSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, ref: "User"},
	student: { type: mongoose.Schema.ObjectId, ref: "Student"}
});



module.exports = mongoose.model('Fav_Student', fav_studentSchema);
