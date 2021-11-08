const express = require('express');
const bcrypt = require('bcryptjs');
// const config = require('../config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const axios = require('axios');
var cors = require('cors')

const app = express();

//Body parser middleware
app.use(express.json());
app.use(cors())

// @route POST api/auth
// @desc Post an item
// @access Public
app.post('/',(req,res) => {
   console.log("Entered route to register user");
   const { email, password } = req.body;

   if(!email || !password){
      res.status(400).json({ msg: "Please enter all fields" });
   }

   axios.get(`http://localhost:4545/${email}`)
   .then(response => {
      console.log(response.data)
      const user = response.data.user
      if(!user){
         res.status(400).json({ msg: "User does not exist" });
      }

      bcrypt.compare(password, user.password)
      .then(isMatch => {
          if(!isMatch) res.status(400).json({ msg: "Invalid credentials" });

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
      })
      .catch(err => console.log(err))
      

   });

   
})

// // @route GET api/auth/user
// // @desc Get user data
// // @access Private
// app.get('/user', auth, (req, res) => {
//    console.log('id',req.user)
//    axios.get(`http://localhost:4545/id/${req.user.id}`)
//    .then(response => {
//       console.log('response', response)
//       res.json(response.data.user);
//    })
//    .catch(err => console.log(err.response))
// });

const port = 6545;

var server = app.listen(port, () => console.log(`Auth microservice started on port: ${port}`));


// module.exports = router;