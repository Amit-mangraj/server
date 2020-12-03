const express = require('express')
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { MONGOURI } = require('./key');
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("conneced to mongo")
})

mongoose.connection.on('error', (err) => {
    console.log("err in connecting", err)
})

require('./models/user')
require('./models/post')
// mongoose.model("User")
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

// // middleware is a code which takes tha  incomming request 
// //and it modify it before it reaches the route 
// const customMiddleware =(req,res,next) =>{
//     console.log("Middleware Executed!!");
//     next();// once this middleware is executed this will call 
//     //the next middleware if no middleware is thier it jump to callback funtion
// }

// // app.use(customMiddleware);
// app.get('/',(req,res) => {
//     console.log("Home")
//     res.send("Hello World" )
// })

// app.get('/about',customMiddleware,(req,res) => {
//     console.log("About");
//     res.send("About Page" );
// })


app.listen(PORT, () => {
    console.log("Server is running on 5000")
})