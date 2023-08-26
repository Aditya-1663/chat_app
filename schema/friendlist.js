
const mongoose= require('mongoose')
const Addfriend=mongoose.Schema({
    
    myemail:{
        type:String,
        require:true
      
    
    },
    friemail:{
        type:String,
        require:true
      
    
    },
    friId:{
        type:String,
        require:true
    },
    friname:{
        type:String,
        require:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }

})
const Myfriend=mongoose.model("Myfriend",Addfriend)
module.exports=Myfriend

