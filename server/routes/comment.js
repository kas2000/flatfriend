var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment.js");



router.get('/:id', function(req, res, next){
	Comment.find({flat: req.params.id}).populate("user", "email")
		.exec(function(err, comments){
			if(err){
				res.status(400).send(err);
			}else{
				res.status(200).send(comments);
			}
		});
});

router.post('/', function(req, res, next){
	console.log(req.body);

	var comment = new Comment({
		firstname: req.body.firstname,
		email: req.body.email,
		flat: req.body.flat,
		user: req.body.user,
		text: req.body.text
	})

	comment.save(function(err, comment){
		if(err) return res.send(err);
		else{
			res.status(200).send(comment);
		}
	});

});

module.exports = router;


