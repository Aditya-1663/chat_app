
const mongoose= require('mongoose')
const Createuser=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    
    },
    password:{
        type:String,
        require:true
    },
    confirm:{
        type:Boolean,
        
    },
    date:{
        type:Date,
        default:Date.now
    }

})
const User=mongoose.model("User",Createuser)
module.exports=User

