var express = require("express");
var router = express.Router();
var Student = require("../models/Student.js");
var multer = require('multer');
var fs = require("fs");
var mkdirp = require('mkdirp');
var path = require("path");
var User = require("../models/User.js");

// Init upload

// const upload = multer({
//   storage: storage,
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('studentImage');

// Passport local



// CheckFileType

// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mimetype
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null, true);
//   }else{
//     cb("wtf");
//   }
// }

// Set storage engine

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//             cb(null, './public/img/flat_images/');
//         },
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + '-' + req.user._id + Date.now() + path.extname(file.originalname));
//   }

// });

var upload = multer({dest:"./public/img/students/"});





router.post('/', upload.single('image'), function(req, res, next){
  console.log(req.file+"<==========REQ FILE PATH");
        Student.findOne({user: req.user._id}).exec(function(err, student){
          if(student){
            res.status(400).send({msg: "You already have an ad!"})
          }else{
              var student = new Student({
              student_firstname: req.body.student_firstname,
              student_birth: req.body.student_birth,
              student_email: req.body.student_email,
              smoking_attitude: req.body.smoking_attitude,
              alcohol_attitude: req.body.alcohol_attitude,
              behaviour_attitude: req.body.behaviour_attitude,
              cooking_skills: req.body.cooking_skills,
              university: req.body.university,
              born_city: req.body.born_city,
              languages: req.body.languages,
              grade: req.body.grade,
              student_comment: req.body.student_comment,
              user: req.user._id
             });
            var tempPath = req.file.path;
            var targetPath = path.resolve('public/img/students/'+student._id+'.'+req.file.originalname.split('.').slice(-1).pop());
            fs.rename(tempPath,targetPath,function(err){
              if(err) return res.status(400).end();
              student.image='/img/students/'+student._id+'.'+req.file.originalname.split('.').slice(-1).pop();
              student.save(function(err){
                User.findById(req.body.user_id).exec(function(err, user){
                      user.student_has_ad = true;
                      user.save(function(err, saved){
                        if(err){
                          console.log(err);
                        }else{
                          console.log(saved);
                        }
                      });
                    });
                if(err) return res.status(400).end();
                res.send(student);
              })
            })
          }
        });
});


router.delete('/:id', function(req, res, next){
  Student.remove({_id: req.params.id}).exec(function(err, success){
    if(err){
      res.status(400).send(err);
    }else{
      res.status(200).end();
    }
  })
});

router.get('/', function(req, res, next){
	Student.find()
	.exec(function(err,students){
        if(err) return res.status(400).end();
        res.send(students);
    });
});

router.get('/:id', function(req, res, next){
  Student.findById(req.params.id).populate("user", "day month")
  .exec(function(err, student){
    if(err){
      // res.status(400).send(err);
      console.log(err);
    }else{
      res.status(200).send(student);
    }
  });
});

router.get('/user_ad/:id', function(req, res, next){
  Student.find({user: req.params.id})
  .exec(function(err, student){
    if(err){
      res.status(400).send(err);
    }else{
      res.status(200).send(student);
    }
  });
});




router.get('/filter/all', function(req, res, next){
  console.log(req.query);

  Student.find({
      university: new RegExp(req.query.university, 'i'),
      born_city: new RegExp(req.query.city, 'i') ,
      smoking_attitude: new RegExp(req.query.smoking, 'i') ,
      alcohol_attitude: new RegExp(req.query.alcohol, 'i') ,
      behaviour_attitude: new RegExp(req.query.behaviour, 'i') ,
      cooking_skills: new RegExp(req.query.cooking, 'i') 
    }).exec(function(err, students){
      if(err){
        res.status(400).send(err);
      }else{
        res.status(200).send(students);
      }
    })
});

// router.get('/', function(req, res, next){
//   Student.find().populate('user', 'firstname email').sort({date: -1}).exec(function(err, students){
//     students.forEach(function(item, index){
//         if(req.user)
//         Like.findOne({student: item._id, user: req.user._id}, function(err, like){
//           if(like) item.liked = true;
//           else item.liked = false;
//         });
//     })

  
//     setTimeout(function(){
//       console.log(students);
//       res.status(200).send(students);
//     }, 200)
    
//   });
// });



module.exports = router;