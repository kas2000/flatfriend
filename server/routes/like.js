var express = require("express");
var router = express.Router();
var Fav_Student = require("../models/Fav_Student.js");



router.post('/', function(req, res, next){
	Fav_Student.findOne({user: req.user._id, student: req.body.student})
			.exec(function(err, fav_student){
				if(fav_student){
					Fav_Student.remove({_id: fav_student._id})
						.exec(function(err){
							res.status(200).send({dislike: true})
						})
				}else{
					new Fav_Student({
						student: req.body.student,
						user: req.user._id
					}).save(function(err, fav_student){
						res.status(200).send({dislike: false});
					});
				}
			});
});

router.get('/:decode', function(req, res, next){
    Fav_Student.count({student: req.params.decode})
        .exec(function(err, likes){
            res.status(200).send({amount: likes})
        })
});

router.get('/', function(req, res, next){
	Fav_Student.find({user: req.user._id}).populate("student", "student_firstname image student_email user")
		.exec(function(err, friends){
			res.status(200).send(friends);
		})
});

module.exports = router;


