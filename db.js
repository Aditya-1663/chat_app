const mongoose=require("mongoose")

const connectToMongodb=async()=>{

    // mongoose.connect('mongodb+srv://chatbox:chatbox@cluster0.6lkaueu.mongodb.net/?retryWrites=true&w=majority')
    mongoose.connect('mongodb+srv://aditya:aditya@cluster0.6lkaueu.mongodb.net/?retryWrites=true&w=majority')

    
    // mongoose.connect('mongodb+srv://aditya:aditya@cluster0.t8oj2cp.mongodb.net/?retryWrites=true&w=majority') 
// mongoose.connect('mongodb://0.0.0.0:27017/chat')
.then(()=>{console.log('connection successfully')})
.catch(()=>console.log("not connected"))

}
module.exports=connectToMongodb