const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requird: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})
// module.exports = mongoose.model("User",userSchema)
mongoose.model("User",userSchema)