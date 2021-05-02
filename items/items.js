const express = require('express');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
// const config = require('../config');
var cors = require('cors')

//Item model
const Item = require('./Item');

const app = express();

//Body parser middleware
app.use(express.json());
app.use(cors())


//DB config
const db = "mongodb://localhost:27017/mern_shopping_list";



mongoose
    .connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// @route GET api/items
// @desc Get all items
// @access Public
app.get('/', (req,res) => {
    Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
})

app.put('/:id',auth,(req, res) => {
    const item  = req.body

    Item.findByIdAndUpdate(req.params.id, {name: item.name}, {new: true})
    .then(item => {
        res.json({ item })
    })
    .catch(err => console.log(err))
})

// @route POST api/items
// @desc Post an item
// @access Private
app.post('/',auth, (req,res) => {
   const newItem = new Item({
       name:req.body.name
   });

   newItem.save()
   .then((item) => res.json(item));
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Private
app.delete('/:id',auth,(req,res) => {
  
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({success:true}))
    .catch(err => res.status(404).json({success:false}));
})


const port = process.env.PORT || 5454;

var server = app.listen(port, () => console.log(`Items microservice started on port: ${port}`));


// module.exports = router;