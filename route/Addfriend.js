const Addfriend =require('../schema/friendlist')
const express = require('express')
const User = require('../schema/createuser')
const {body ,validationResult}=require('express-validator')

const router = express.Router()
router.post('/addfriend',
[
   
    body("myemail","enter the valid email").isEmail(),
    body("friemail","enter the valid email").isEmail()
   

],
 async (req, res) => {
    const validationcheck=validationResult(req)
    if(!validationcheck.isEmpty()){
        return res.status(400).json({errors:validationcheck.array()})

    }
    try {
        let user1 = await User.findOne({ email: req.body.myemail})
        let user2 = await User.findOne({ email: req.body.friemail })
        if(!user1||!user2||user2.confirm){
            return res.status(404).json({error:'not extis'})
        }

        let myem = await Addfriend.findOne({ myemail: req.body.myemail })
        let friem = await Addfriend.findOne({ friemail: req.body.friemail })
        let frie = await Addfriend.find({ myemail: req.body.myemail })
        let frie1 = await frie.find(fri =>fri.friemail==req.body.friemail )
        if(frie1){
            return res.status(404).json({error:'Already extis'})

        }
        // if(myem&&friem){
        //     return res.status(404).json({error:'not extis'})
        // }
        
       var user = await Addfriend.create({
            myemail: req.body.myemail, 
            friemail: req.body.friemail, 
            friId:user2.id,
            friname:user2.name
           
        })
        res.json({user})
        
    } catch (error) {
        
        console.log(error)

    }
 
})


module.exports =router;