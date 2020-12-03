const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId, //Id of the user 
        ref: "User"
    }
})
//this is comment
mongoose.model("Post", postSchema)