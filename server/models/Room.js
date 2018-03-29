var mongoose = require("mongoose");

var Room = mongoose.Schema({
    title: String,
    reciever: String,
    accepted: {type: Boolean, default: false},
    group_room: {type: Boolean, default: false},
    //populate
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Messages'}],
    student: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
});

module.exports = mongoose.model('Room', Room);