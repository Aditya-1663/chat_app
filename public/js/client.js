const socket=io('http://localhost:3000') 
// const socket=io() 
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')
// const aditya=function(data){
//     console.log("gfx")
// }

var userid

function aditya(data){
    userid=data.getAttribute("key")
    console.log(data.getAttribute("key"))
    // console.log(data.this)
}
const append=(message,positon)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(positon)
    messagecontainer.append(messageElement)
}
let receiveid="oWqzyVh6Q-ET2EQkAAAD"
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value
    append(`You:${message}`,"right")
    socket.emit('send',message,receiveid)
    messageinput.value=''
})

// var name1=prompt("enter your name")
var name1=userid

 socket.emit('new_user_joined', name1 ) 

socket.on('user-joined',(name,id)=>{
    receiveid=id
    append(`${name} joined this chat`,"left")
})
socket.on('receive',data=>{
    alert("dasdasjkd")
    append(`${data.name}: ${data.message}`,"left")
})
socket.on('leftchat',data=>{
    append(`${data.name} left the chat`,"left")
})
