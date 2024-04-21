const socket=io('http://localhost:5000') 
// const socket=io() 
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')
const toadd=document.querySelector('.toadd')
const chats1=document.querySelectorAll('.chats1')
const my1=document.querySelector('#senderid')
// const aditya=function(data){ 
//     console.log("gfx")
// }

var userid

var name12 =my1.innerHTML; 
// var name12 ="aditya"; 
// alert(".........."+name12)
chats1.forEach(div => {
    div.addEventListener('click', function() {
       
        userid = div.getAttribute('key');
        alert(userid)
        const tomess=document.querySelectorAll('.message')
        document.querySelector('#intialbox').remove()
        document.querySelector('#send-container').style.display='block'
  
       
      socket.emit('clicked',userid ) 
        tomess.forEach(box => {
            box.remove();
          });
    //    tomess.remove();
        // toadd.append(messagecontainer);

        // alert('Name://'+ customDataString);
    });
     
});




// function aditya(){
//     userid=data.getAttribute("key")
//     console.log(data.getAttribute("key"))
//     console.log(data.this)
   
// }
const append=(message,positon)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(positon)
     const now=new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours=hours%12
    const minutes = now.getMinutes();
    const Time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const timeElement = document.createElement('div');
    timeElement.innerText = Time;
    timeElement.classList.add('timemess'); 
    messageElement.appendChild(timeElement);
    messagecontainer.append(messageElement)
}



// let receiveid="oWqzyVh6Q-ET2EQkAAAD"
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value
    append(`You:  ${message}`,"right")
    socket.emit('send',message,userid,name12)
    messageinput.value=''
})

// var name1=prompt("enter your name")

//  alert("adsds:=="+name12+"==sdffssfds")
 socket.emit('new_user_joined',name12) 


socket.on('user-joined',(name,id)=>{
    receiveid=id
    append(`${name} joined this chat`,"left")
})
socket.on('receive',data=>{
    if(data.name==name12 && data.name12==userid){

        // alert("dasdasjkd")
        // append(`${userid}: ${data.message}`,"left")
        append(`${name12}: ${data.message}`,"left")
    }
    else{
        alert(data.name+"........"+data.name12+name12)
    }
})
socket.on('leftchat',data=>{
    append(`${data.name} left the chat`,"left")
})
