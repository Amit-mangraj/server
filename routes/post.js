const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middeleware/requireLogin')
const { route } = require('./auth')
const Post = mongoose.model("Post")

router.get('/getallpost',(req,res)=>{
    Post.find().populate("postedBy","_id name").then(posts=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then(myposts=>{
        res.json({myposts})
    }).catch(err=>{
        console.log(err)
    })
})

router.delete('/deletemypost',requireLogin,(req,res)=>{
    
    Post.findById({_id}).then(myposts=>{
        res.status(200).json({message:"Post deleted Succesfully"})
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    const {title, body}= req.body
    if(!title||!body){
        return res.status(422).json({error:"Please add Title to post"})
    }

    req.user.password= undefined
    const post = new Post({
        title,
        body,
    postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router