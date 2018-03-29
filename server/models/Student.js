var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types

var studentSchema = new mongoose.Schema({
	student_firstname: String,
    student_birth: String,
    student_email: String,
	smoking_attitude: String,
 	alcohol_attitude: String,
 	behaviour_attitude: String,
 	cooking_skills: String,
 	university: String,
 	born_city: String,
 	grade: String,
 	languages: String,
 	student_comment: String,
 	image: String,
 	user: String,
 	createdAt: { type: Date, expires: 60*60*24*7, default: Date.now }
});



module.exports = mongoose.model('Student', studentSchema);
