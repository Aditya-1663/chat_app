const Addfriend =require('../schema/friendlist')
const express = require('express')
const User = require('../schema/createuser')
const {body ,validationResult}=require('express-validator')
const session = require("express-session");
const router = express.Router()
router.post('/addfriend',
[
   
    
    body("friemail","enter the valid email").isEmail()
   

],
 async (req, res) => {
    const validationcheck=validationResult(req)
    if(!validationcheck.isEmpty()){
        
        return res.status(400).json({errors:validationcheck.array()})
        
    }
    try {
        
        if (!req.session.email1) {
         
            // return res.redirect("http://localhost:5000/");
            return  res.status(400).json({error:"login required"})
          }
          console.log(req.session.email1)
        let user1 = await User.findOne({ email: req.session.email1})
        let user2 = await User.findOne({ email: req.body.friemail })
       
        if(user2===null){
            return res.status(400).json({email:"invite friend"})
        }
        if(!user1||!user2||!user2.confirm){
            return res.status(404).json({
                user1:user1,
                user2:user2,
                user2c:user2.confirm,
                
                error:'not extis'})
        }

        let myem = await Addfriend.findOne({ myemail:req.session.email1 })
        let friem = await Addfriend.findOne({ friemail: req.body.friemail })
        let frie = await Addfriend.find({ myemail: req.session.email1 })
        let frie1 = await frie.find(fri =>fri.friemail==req.body.friemail )
        if(frie1){
            return res.status(404).json({error:'Already extis'})

        }
        // if(myem&&friem){
        //     return res.status(404).json({error:'not extis'})
        // }
        
       var user = await Addfriend.create({
            myemail:req.session.email1, 
            friemail: req.body.friemail, 
            friId:user2.id,
            friprofile:user2.profile,
            friname:user2.name
           
        })
        res.status(200).json({ success: true, message: 'Friend added successfully' });
        // res.status(204).end();
        // res.json({user})
        
    } catch (error) {
        
        console.log(error)

    }
 
})


module.exports =router;