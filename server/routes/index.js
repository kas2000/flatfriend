var express = require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require("path");
var User = require("../models/User.js");
var io = require("socket.io")();


passport.use(new LocalStrategy({ usernameField: 'email' },
    function( email, password, done) {
        User.findOne({ email: email }).exec(function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            user.comparePassword(password, function(err, isMatch) {
                if (err) return done(err);
                if (isMatch) return done(null, user);
                return done(null, false);
            });
        });
}));

passport.serializeUser(function(user, done) {
    console.log("serializeUser", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).exec(function(err, user) {
        console.log("deserializeUser", user);
        done(err, user);
    });
});

router.use(passport.initialize());
router.use(passport.session());



router.use(function(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));
    }
    next();
});

//Access to pages!
router.get('/student_dashboard', function(req, res, next){
    if(req.user){
        if(req.user.role=="student") {
            console.log("Access to a student");
            next(); 
        }else{
            res.redirect("/#404");
        }
    }else{
        res.redirect("/#signin");
    }
});

router.get('/landlord_dashboard', function(req, res, next){
    if(req.user){
        if(req.user.role=="landlord") {
            console.log("Access to a landlord");
            next(); 
        }else{
            res.redirect("/#404");
        }
    }else{
        res.redirect("/#signin");
    }
});

router.get('/add_appartment', function(req, res, next){
        if(!req.user || req.user.role !== "student") {
            console.log("Access to a landlord");
            next(); 
        }else{
            res.redirect("/#404");
        }
});

router.get('/add_student', function(req, res, next){
    if(req.user){
        if(req.user.role=="student") {
            console.log("Access to a student");
            next(); 
        }else{
            res.redirect("/#404");
        }
    }else{
        res.redirect("/#signin");
    }
});



//Authentication

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.cookie('user', JSON.stringify(req.user));
    console.log("LOL"+req.user);
    res.send(req.user);
});




router.post('/api/signup', function(req, res, next){
           var user = new User({
             firstname: req.body.firstname,
             lastname: req.body.lastname,
             email: req.body.email,
             password: req.body.password,
             day: req.body.day,
             month: req.body.month,
             year: req.body.year,
             gender: req.body.gender,
             role: req.body.role,
             university: req.body.university,
             uni_lat: req.body.uni_lat,
             uni_long: req.body.uni_long,
             quick: req.body.quick
           });       
           user.save(function(err, user){
             req.login(user, function(err) {
                  return res.json(user);
              });
           })
        
    });





router.get('/api/logout', function(req, res, next) {
    req.logout();
    res.status(200).end();
})




//===================================================



router.use('/api/flat', require("./flat.js"));
router.use('/api/student', require("./student.js"));
router.use('/api/fav_student', require("./like.js"));
router.use('/api/email', require("./email.js"));
router.use('/api/comment', require("./comment.js"));
router.use('/api/user', require("./user.js"));




router.get('*', function(req, res, next) {
    res.redirect('/#' + req.originalUrl);
})



module.exports = router;