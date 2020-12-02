const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt   = require('jsonwebtoken')

const {JWT_SECRET} =require('../key')

const requireLogin = require('../middeleware/requireLogin')
router.get('/protected',requireLogin, (req, res) => {
    const{token} = req.body
    if(token)
    res.send("hello")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please add all fields to SignUp" })
    }
    //    res.json({message:"successfully SignUp"})

    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that email" })
        }
        bcrypt.hash(password, 12).then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword,
                name
            })
            user.save().then(user => {
                res.json({ messsage: "Saved Sucessfully" })
                    .catch(err => {
                        console.log(err)
                    })
            })
                .catch(err => {
                    console.log(err)
                })
        })
    })

})
router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "Please Provide a valid Email" })
    }
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            res.status(422).json({ error: "Invalid Email or Pssoword" })
        }

        bcrypt.compare(password, savedUser.password).then(doMatch => {
            if (doMatch) {
                // res.status(200).json({ messsage: "Successful signed in" })
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email}= savedUser
               res.json({token,user:{_id,name,email}})
            }
            else {
                return res.status(422).json({ messsage: "Invalid Email or Password" })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router