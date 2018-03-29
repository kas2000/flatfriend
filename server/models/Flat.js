var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types

var flatSchema = new mongoose.Schema({
    rooms: String,
    price: String,
    home_type: String,
    year: String,
    floor: String,
    all_floors: String,
    all_area: String,
    living_area: String,
    kitchen_area: String,
    city: String,
    district: String,
    rajon: String,
    house_complex: String,
    street: String,
    house_number: String,
    cross_street: String,
    longitude: { type: SchemaTypes.Double },
    latitude: { type: SchemaTypes.Double },
    flat_state: String,
    phone_state: String,
    internet_state: String,
    wc_state: String,
    balcony_state: String,
    door_state: String,
    furniture_state: String,
    floor_state: String,
    flat_comment: String,
    email: { type: String, lowercase: true },
    pay_frequency: String,
    phone_number: String,
    main_image: String,
    images: String,
    // createdAt: { type: Date, expires: 60*60*24*7, default: Date.now } //every 7 days
});



module.exports = mongoose.model('Flat', flatSchema);
