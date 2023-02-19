const express = require('express')
const {getBootcamps} = require("../controllers/bootcamps");
const router = express.Router();
router.get('/',(req,res)=>{
    res.status(200).json({success:true,"msg":"show all bootcamps"});
})

router.get('/:id',getBootcamps)
router.post('/',(req,res)=>{
    res.status(200).json({success:true,"msg":"create new bootcamp"});
})
router.put('/:id',(req,res)=>{
    res.status(200).json({success:true,"msg":`Edit bootcamp with id Number ${req.params.id}`});
})
router.delete('/:id',(req,res)=>{
    res.status(200).json({success:true,"msg":`Delete bootcamp with id Number ${req.params.id}`});
})

module.exports=router;