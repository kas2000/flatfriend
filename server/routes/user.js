var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var passport = require('passport');
var mongoose = require("mongoose");
// router.get('/', function(req, res, next) {
//     console.log("hello__________", req.user);
//     if(req.user) {
//         res.status(200).send(req.user)
//     } else {
//         res.status(200).end();
//     }
// })

router.get('/edit/:data', function(req, res, next){
  User.findById(req.params.data).exec(function(err, user){
  	if(err){
  		res.status(400).send(err);
  	}else{
  		res.status(200).send(user);
  	}
  })
});

router.get('/:data', function(req, res, next){
  User.findById(req.params.data).exec(function(err, user){
  	if(err){
  		res.status(400).send(err);
  	}else{
  		res.status(200).send(user);
  	}
  })
});

router.get('/streaming/:id/:user', function(req, res, next){
  var id = mongoose.Types.ObjectId(req.params.id);
  var streamers = [];
  // console.log(req.params.id+'<============ROOM_ID');
  User.find({rooms: id }).exec(function(err, user){
    if(err){
      res.status(400).send(err);
    } else {
      res.status(200).send(user);
      console.log(user);
    }
    // console.log(user.firstname+'<=========USERNAME');
    
  })
});

router.put('/disconnect/:user_id', function(req, res, next){
  User.findById(req.params.user_id).exec(function(err, user){
    user.isStreaming = false;
    user.streamId = null;
    user.save(function(err){
      if(err) { res.status(400).send(err); }
      else { res.status(200).end(); }
    })
  })
})

router.put('/:id', function(req, res, next){
  if(req.body.new_password){
    User.findById(req.params.id).exec(function(err, user){
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.day = req.body.day;
      user.month = req.body.month;
      user.year = req.body.year;
      user.vk = req.body.vk;
      user.facebook = req.body.facebook;
      user.instagram = req.body.instagram;
      user.telegram = req.body.telegram;
      user.password = req.body.new_password;
      user.gender = req.body.gender;
      user.save(function(err){
         if (err) { next(err) }
         else {
             res.status(200).end();
         }
     })
    });
  }else{
    User.findById(req.params.id).exec(function(err, user){
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.day = req.body.day;
      user.month = req.body.month;
      user.year = req.body.year;
      user.vk = req.body.vk;
      user.facebook = req.body.facebook;
      user.instagram = req.body.instagram;
      user.telegram = req.body.telegram;
      user.gender = req.body.gender;
      user.save(function(err){
        if(err){ next(err) }
        else{
          res.status(200).end();
        }
      })
    })
  }
  
});

router.put('/:id/:streamId', function(req, res, next){
  var streamId = req.params.streamId;
  User.findById(req.params.id).exec(function(err, user){
    user.streamId = streamId;
    user.isStreaming = true;
    user.save(function(err, user){
      if(err) { res.status(400).end() }
      else {
        res.status(200).send(user);
      }
    })
  })
});




module.exports = router;