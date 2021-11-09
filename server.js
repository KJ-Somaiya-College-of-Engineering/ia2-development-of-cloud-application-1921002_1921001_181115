// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const config = require('config');
// const https = require('https');
// const fs = require('fs');

// const app = express();

// //Body parser middleware
// app.use(express.json());

// //DB config
// const db = config.get('mongoURI');

// mongoose
//     .connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true})
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err))

//     app.use('/api/items',require('./routes/api/items'));
//     app.use('/api/users',require('./routes/api/users'));
//     app.use('/api/auth',require('./routes/api/auth'));

//     //Serve static assets if in production
//     if(process.env.NODE_ENV === 'production'){
//         //Set static folder
//         app.use(express.static('client/build'));

//         app.get('*', (req, res) => {
//             res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//         });
        
//     }


//     const port = process.env.PORT || 5000;

//     // var server = app.listen(port, () => console.log(`Server started on port: ${port}`));

//     var server = https.createServer({
//         key: fs.readFileSync('./key.pem'),
//         cert: fs.readFileSync('./cert.pem'),
//         passphrase: 'mern'
//     }, app)
//     .listen(port);
//     module.exports = server

// const concurrently = require('concurrently');
// const waitOn = require('wait-on');



// async function startUp() {
//     concurrently(["concurrently -k npm:start:*"]);
//     await waitOn({ resources: ["tcp:5454", "tcp:4545", "tcp:6545"] });
// }

// startUp();

const itemsApp = require("./items/items");
const usersApp = require("./users/users");
const authApp = require("./auth/auth");

var server1 = itemsApp.listen(8080, () => console.log("Items microservice started on port: 8080"));
var server2 = usersApp.listen(8081, () => console.log("Users microservice started on port: 8081"));
var server2 = authApp.listen(6545, () => console.log("Auth microservice started on port: 6545"));
