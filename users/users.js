const express = require('express');
const bcrypt = require('bcryptjs');
// const config = require('../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
var cors = require('cors')

const app = express();

//Body parser middleware
app.use(express.json());
app.use(cors())

//User model
const User = require('./User');

//DB config
//const db = "mongodb+srv://todo-list-user:todo-list-user@todo-list.klv0v.mongodb.net/todo-list?retryWrites=true&w=majority";
const db = "mongodb+srv://pranav:abcd1234@cluster0.slqcc.mongodb.net/mern_shopping?retryWrites=true&w=majority";


mongoose
    .connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


   //  app.get('/id/:id',(req,res) => {
   //    const { id } = req.params
   //    console.log(id)
   //    User.findOne({id: id})
   //    .select('-password')
   //    .then(user => {
   //       console.log(user)
   //       if(!user){
   //          return res.status(400).json({ msg: "User does not exist" });
   //       }
   //       res.json({ user })
   //    })
   //    .catch(err => console.log(err))
   // })


app.get('/:emailId',(req,res) => {
   const {emailId} = req.params
   User.findOne({email: emailId})
   .then(user => {
      if(!user){
         res.status(400).json({ msg: "User does not exist" });
      }
      res.json({ user })
   })
})



// @route POST api/users
// @desc Create a user
// @access Public
app.post('/',(req,res) => {
   console.log("Inside route to register user");
   const { name, email, password } = req.body;

   if(!name || !email || !password){
      res.status(400).json({ msg: "Please enter all fields" });
   }

   User.findOne({email})
   .then(user => {
      if(user){
         res.status(400).json({ msg: "User already exists" });
      }
      const newUser = new User({
         name,
         email,
         password
      });
   
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
               console.log("User registered");
               jwt.sign(
                  { id: user.id },
                  "msl_myJwtSecret",
                  { expiresIn: 3600 },
                  (err, token) => {
                     if(err) throw err;
                     
                     res.json({
                        token,
                        user:{
                           _id: user._id,
                           name: user.name,
                           email: user.email
                        }
                     });
                  }
               )


            });
         })
      });

   });

   
})

const port = 4545;

var server = app.listen(port, () => console.log(`Users microservice started on port: ${port}`));


// module.exports = router;