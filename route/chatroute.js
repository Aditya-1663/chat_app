const { model } = require("mongoose")
// const {io}=require('../index')


const chat=()=>{
    
io.on('connection',socket =>{
    socket.on('new_user_joined',(name)=>{ 
        // console.log("name:",name)     
        console.log("name33:",socket.id)     
        users[socket.id]=name
        socket.broadcast.emit('user-joined',name); 
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leftchat',{name:users[socket.id]})
        delete users[socket.id]
    })
})



}
module.exports=chat