const connectToMongodb = require('./db')
// node server which will handle socket io server
const  express = require('express')
const path = require('path')
const app = express()
const port = 5000
const http=require('http').Server(app)
app.use(express.static(path.join(__dirname,'/public')))
const users={} 
const hbs=require('hbs')
// var hbs1 = hbs.create({
//     helpers: {
//         hello: function () { console.log('hello'); }
//     }
// });
// app.engine('hbs', hbs1.engine);

const io=require('socket.io')(http) 
// const chat=require('./route/chatroute')

const sendmail = require('./route/mailsender')
var jwt = require('jsonwebtoken');
const User = require('./schema/createuser')

var cors = require('cors')

app.set('view engine', 'hbs');
app.use(cors())
connectToMongodb();
app.use(express.json())

const jwtscrect = "adityakumarisagoodboy"
app.use('/user', require('./route/Usercreate'))
app.get('/verifying/:token', async (req, res) => {
    try {
        const data = jwt.verify(req.params.token, jwtscrect)
        await User.findByIdAndUpdate(data.user.id, { $set: { confirm: true } }, { new: true })
        res.redirect('http://localhost:3000/index.html')
    } catch (error) {
        console.log(error)


    }

})
 

app.get('/', async (req, res) =>{
    const data= await User.find()
   
    res.render("login",{userdata:data}) 
})
app.post('/index', async (req, res) =>{
    const data= await User.find()
   
    res.render("index",{userdata:data}) 
})

// app.get('/', (req, res) =>{
//     var option={
//         root:path.join(__dirname,'/public')
//     }
    
//     // console.log(option)
//     var file='index.html'
//     res.sendFile(file,option)
// })

// chat()

io.on('connection',socket =>{
    socket.on('new_user_joined',(name)=>{ 
        // console.log("name:",name) 
        console.log("name33:",name)       
        users[socket.id]=name
        socket.broadcast.emit('user-joined',(name,socket.id)); 
    })
    socket.on('send',(message,receiveid)=>{
        // console.log("revid",socket.id) -
       socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leftchat',{name:users[socket.id]})
        delete users[socket.id]
    })
})


// module.exports=io
http.listen(port, () => console.log(`listening on port ${port}!`))
