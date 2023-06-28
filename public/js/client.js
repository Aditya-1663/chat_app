const socket=io('http://localhost:5000') 
// const socket=io() 
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')


const append=(message,positon)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(positon)
    messagecontainer.append(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value
    append(`You:${message}`,"right")
    socket.emit('send',message)
    messageinput.value=''
})

var name1=prompt("enter your name")

 socket.emit('new_user_joined', name1 ) 

socket.on('user-joined',name=>{
    append(`${name} joined this chat`,"left")
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,"left")
})
socket.on('leftchat',data=>{
    append(`${data.name} left the chat`,"left")
})
