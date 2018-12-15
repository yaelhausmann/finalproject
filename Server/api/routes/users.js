const express = require('express');
const router = express.Router();
const Product = require('../models/products')
const mongoose = require('mongoose') // import mongoose to create mongooseobject id
const User = require('../models/users')
const bcrypt = require('bcrypt')
router.post('/signup', (req, res, next) => {
   User.find({email: req.body.email}).exec().then(user =>{
       if (user.length >= 1){
           return res.status(409).json({
               message:'mail exists'
           })
          
       }
       else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                user
                .save()
                .then(result =>{
                    console.log(result)
                    res.status(201).json({
                        message : 'User Created'
                    })
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error:err
                    })
                });
            }
        })

       }
   }).catch();



})

router.delete('/:userID', (req, res, next)=>{
    User.remove({
        _id : req.params.userID
    })
    .exec()
    .then(result =>{
        res.status(200).json({
            message : "user deleted"
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

module.exports = router;