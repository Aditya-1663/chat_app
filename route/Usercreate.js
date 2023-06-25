const User = require('../schema/createuser')
const express = require('express')
const bcrypt =require('bcryptjs')
const router = express.Router()
const jwt=require('jsonwebtoken')
const {body ,validationResult}=require('express-validator')
const sandmail=require('./mailsender')


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
            name: req.body.name
        })
        const data={
            user:{
                id:user.id   
            }

        }
        const authtoken=await jwt.sign(data,jwtscrect)
          

        res.json({user,authtoken})
    } catch (error) {
        console.log(error)

    }
 
})


module.exports = router;