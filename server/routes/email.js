var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");


router.post('/', function(req, res, next){
	let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth:{
        user: 'kyzaibekk@gmail.com',
        pass: 'jokermms1224'
    }
	});

		let mailOptions = {
	    from: '"Flat Find" <asd@gmail.com>', // sender address
	    to: 'kyzaibekk@gmail.com', // list of receivers
	    subject: 'Flat Find', // Subject line
	    text: req.body.text, // plain text body
	    // html: ({path: 'islamic_center/index.html'}), // html body

	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }else{
	    	res.status(200).send(info);
	    	console.log('Message %s sent: %s', info.messageId, info.response);
	    }
	});

})

module.exports = router;


