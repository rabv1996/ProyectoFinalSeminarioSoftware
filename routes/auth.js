const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/login', function(req,res,next){
  console.log("algo");
   passport.authenticate('local', {session:false}, (err,user,info)=>{
        if(err || !user){
            return res.status(400).json({message:'Algo no salio bien', user : user});
        }

        req.login(user, {session:false},(err) => {
            if (err){
                res.send(err);
            }

            const token = jwt.sign(user,'S3cr3tK3y');
            return res.json({user,token});
        })
    })

    var name = req.body.name;

    req.checkBody('name', 'Required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        console.log('yes');
    }else{
        console.log('no');
    }
});

module.exports = router;
