const mongoose = require('mongoose') // import mongoose to create mongooseobject id
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.get_all =  (req, res, next) => {
    User.find() //the method finc can also accept where clause
        .select('email')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        email: doc.email,
                        role : doc.role
                    }
                })
            }
            if (docs.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No Users"
                })
            }

        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            }
        )
}

exports.create = (req, res, next) => {
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
                 console.log(typeof (req.body.role))
                 let role = typeof (req.body.role) == "undefined" ? "Customer" : "Admin";
                 const user = new User({
                     _id: new mongoose.Types.ObjectId(),
                     email: req.body.email,
                     password: hash,
                     role: role
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
 
 
 
 }
exports.get_one = (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if (user.length <1){
            return res.status(401).json({
                message : 'Authoriwation failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (result){
                const token = jwt.sign({
                    email:user[0].email,
                    
                    userID:user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                },
                
                )
                return res.status(200).json({
               message: 'Auth successful',
               email: user[0].email,
               role:user[0].role,
               token : token
                })
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}
exports.delete = (req, res, next)=>{
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
}