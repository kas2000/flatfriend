var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    day: String,
    month: String,
    year: String,
    gender: String,
    role: String,
    avatar: String,
    instagram: String,
    vk: String,
    facebook: String,
    telegram: String,
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}],
    notifications: {type: Boolean, default: true},
    university: String,
    uni_lat: { type: SchemaTypes.Double },
    uni_long: { type: SchemaTypes.Double },
    student_has_ad: { type: Boolean, default: false},
    quick: Boolean,
    isStreaming: { type: Boolean, default: false},
    streamId: String,
    active: { type: Boolean, required: true, default: false},
    avatar: String
});


userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', userSchema);
