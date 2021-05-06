const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req,res) => {
    Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
})

// @route POST api/items
// @desc Post an item
// @access Private
router.post('/',auth, (req,res) => {
   const newItem = new Item({
       name:req.body.name
   });

   newItem.save()
   .then((item) => res.json(item));
})

router.put('/:id',auth,(req, res) => {
    const item  = req.body

    Item.findByIdAndUpdate(req.params.id, {name: item.name}, {new: true})
    .then(item => {
        res.json({ item })
    })
    .catch(err => console.log(err))
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Private
router.delete('/:id',auth,(req,res) => {
  
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({success:true}))
    .catch(err => res.status(404).json({success:false}));
})


module.exports = router;