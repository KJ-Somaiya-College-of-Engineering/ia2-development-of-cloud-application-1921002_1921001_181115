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

const concurrently = require('concurrently');
const waitOn = require('wait-on');

async function startUp() {
    concurrently(["concurrently -k npm:start:*"]);
    await waitOn({ resources: ["tcp:5454", "tcp:4545", "tcp:6545"] });
}

startUp();