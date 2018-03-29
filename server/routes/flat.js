var express = require("express");
var router = express.Router();
var Flat = require("../models/Flat.js");
var multer = require('multer');
var fs = require("fs");
var mkdirp = require('mkdirp');
var path = require("path");

var upload = multer({dest:"./public/img/flat_images/"});


router.post('/', upload.array('images') ,function(req, res, next){
    console.log(req.files);
    var images = [];
var flat =  new Flat({
        rooms: req.body.rooms,
        price: req.body.price,
        home_type: req.body.home_type,
        year: req.body.year,
        floor: req.body.floor,
        all_floors: req.body.all_floors,
        all_area: req.body.all_area,
        living_area: req.body.living_area,
        kitchen_area: req.body.kitchen_area,
        city: req.body.city,
        district: req.body.district,
        rajon: req.body.rajon,
        house_complex: req.body.house_complex,
        street: req.body.street,
        house_number: req.body.house_number,
        cross_street: req.body.cross_street,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        flat_state: req.body.flat_state,
        phone_state: req.body.phone_state,
        internet_state: req.body.internet_state,
        wc_state: req.body.wc_state,
        balcony_state: req.body.balcony_state,
        door_state: req.body.door_state,
        furniture_state: req.body.furniture_state,
        floor_state: req.body.floor_state,
        flat_comment: req.body.flat_comment,
        email: req.body.email,
        phone_number: req.body.phone_number,
        name: req.body.firstname,
        pay_frequency: req.body.pay_frequency
   });
        req.files.forEach(function(value, index){
            console.log(req.files.length);
            var tempPath = value.path;
            var targetPath = path.resolve('public/img/flat_images/'+flat._id+index+'.'+value.originalname.split('.').slice(-1).pop());
            images.push('/img/flat_images/'+flat._id+index+'.'+value.originalname.split('.').slice(-1).pop());
            console.log(images);
            fs.rename(tempPath,targetPath,function(err){
                if(err) return res.status(400).end();
            });
        });
        flat.main_image = images[0];
        flat.images = images;
        flat.save(function(err){
            if(err) return res.status(400).end();
            res.send(flat);
        });
});

router.delete('/:id', function(req, res, next){
    Flat.remove({_id: req.params.id}).exec(function(err, success){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).end();
        }
    })
});



router.get('/', function(req, res, next){
  Flat.find().sort({date: -1}).exec(function(err, flats){
    res.status(200).send(flats);
  });
});

router.get('/user_ad/:email', function(req, res, next){
  Flat.find({email: req.params.email}).exec(function(err, flats){
    res.status(200).send(flats);
  });
});


router.get('/:id', function(req, res, next){
    Flat.findById(req.params.id).exec(function(err, flat){
        if(err){
            res.status(400).send(err);
            console.log(err);
        }else{  
            res.status(200).send(flat);
        }
    });
});

router.get('/filter/all', function(req, res, next){
    console.log(req.query.price_from);
    console.log(req.query.price_to);
    Flat.find({
        furniture_state: new RegExp(req.query.furniture_state, 'i'),
        flat_state: new RegExp(req.query.flat_state, 'i'),
        phone_state: new RegExp(req.query.phone_state, 'i'),
        internet_state: new RegExp(req.query.internet_state, 'i'),
        wc_state: new RegExp(req.query.wc_state, 'i'),     
        rooms: new RegExp(req.query.rooms, 'i'),
        home_type: new RegExp(req.query.home_type, 'i'),
        price: {$gte: req.query.price_from, $lte: req.query.price_to},
        all_area: {$gte: req.query.overall_area_from, $lte: req.query.overall_area_to},
        living_area: {$gte: req.query.living_area_from, $lte: req.query.living_area_to},
        kitchen_area: {$gte: req.query.kitchen_area_from, $lte: req.query.kitchen_area_to}
    })
        .exec(function(err, flats){
            if(err) return res.send(err);
            else{
                res.status(200).send(flats);
            }
        })
});


module.exports = router;