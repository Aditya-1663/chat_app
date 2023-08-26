const User = require('../schema/createuser')

const express = require('express')
const bcrypt =require('bcryptjs')
const router = express.Router()
const jwt=require('jsonwebtoken')
const {body ,validationResult}=require('express-validator')
const sendmail=require('./mailsender')
const session =require('express-session')

const jwtscrect="adityakumarisagoodboy"



router.post('/createuser',
[
    body("name","enter the valid name").isLength({min:2}),
    body("email","enter the valid email").isEmail(),
    body("password","enter the 6 char password").isLength({min:6})

],
 async (req, res) => {
    const validationcheck=validationResult(req)
    if(!validationcheck.isEmpty()){
        return res.status(400).json({errors:validationcheck.array()})

    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({error:'email is already exist'})
        } 
        const slat=await bcrypt.genSalt(10)
        const pass=await bcrypt.hash(req.body.password,slat)
        user = await User.create({
            email: req.body.email, 
            password: pass,
            name: req.body.name,
            confirm:false
        })
        const data={
            user:{
                id:user.id   
            } 

        }
        const authtoken=await jwt.sign(data,jwtscrect)
          sendmail({authtoken,email:req.body.email})

        res.json({user,authtoken})
    } catch (error) {
        
        console.log(error)

    }
 
})

// login part

router.post('/login',
[
   
    body("email","enter the valid email").isEmail(),
    body("password","enter the 6 char password").isLength({min:6})

],
async(req,res)=>{
    // console.log(req.body.email) 
    // console.log(res.body.json,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq') 
    const validationcheck=validationResult(req)
    //   res.json(req.body.email)
    if(!validationcheck.isEmpty()){
        return res.status(400).json({errors:validationcheck.array()})
        
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({error:'enter valid email'})
        } 
        if(!user.confirm){
            return res.status(400).json({confirmation:'confirmation required'})
        }
        const pass_check=await bcrypt.compare(req.body.password,user.password)
        if(!pass_check){
            return res.status(404).json({error:'enter correct password'})
        }
        const data={
            user:{
               id: user.id
            }
    
          }
         const authtoken= jwt.sign(data,jwtscrect)
        //  var email1=""
         req.session.email1=req.body.email
        //  console.log(authtoken)
         res.redirect(`http://localhost:5000/index`)
        //  res.render("index") 
        //  res.json({authtoken})


        
    } 
     
    catch (error) {
        console.log(error)
        
    }


})

router.post('/my',(req,res)=>{
    console.log("aditya")
    res.send("aditya")
})






module.exports = router;