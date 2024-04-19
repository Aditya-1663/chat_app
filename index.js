const connectToMongodb = require('./db')
// node server which will handle socket io server
const  express = require('express')
const path = require('path')
const app = express()
const port =process.env.PORT|| 5000
const http=require('http').Server(app)
app.use(express.static(path.join(__dirname,'/public')))
const users={} 
const hbs=require('hbs')
const session =require('express-session')
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
const Addfriend =require('./schema/friendlist')

// this is using for keeping the value for the running session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));
var cors = require('cors')
const pathviews=path.join(__dirname,'./tampletes/views')
const pathpartial=path.join(__dirname,'./tampletes/partials')
app.set('view engine', 'hbs');
app.set('views',pathviews)
hbs.registerPartials(pathpartial)
app.use(cors())
connectToMongodb();
app.use(express.json()) 


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jwtscrect = "adityakumarisagoodboy"
app.use('/user', require('./route/Usercreate'))
app.use('/myfriend', require('./route/Addfriend'))

app.get('/verifying/:token', async (req, res) => {
    try {
        const data = jwt.verify(req.params.token, jwtscrect)
        await User.findByIdAndUpdate(data.user.id, { $set: { confirm: true } }, { new: true })
        res.redirect('http://localhost:5000/')
    } catch (error) {
        console.log(error)


    }
 
})

 


 

// app.get('/', async (req, res) =>{
//    // const data= await User.find()
//     const data= await Addfriend.find({myemail:'kumar@gmail.com'}) 
//    // var json_data = JSON.stringify(data);
//     // res.render("index",{userdata:data,email:req.session.email1})  
//     res.render("index",{userdata:data,email:"kumar@gmail.com"})  
// })


// this is right
app.get('/', async (req, res) =>{
    const data= await User.find()
    
   
    res.render("login",{userdata:data})  
})


var user={}
app.get('/index', async (req, res) =>{
    if(!req.session.email1){
        return  res.redirect('http://localhost:5000/')
    }
     user=await User.findOne({email:req.session.email1})
    const data= await Addfriend.find({myemail:req.session.email1}) 
    // console.log(req.session.email1)
    // console.log(data.length)
    res.render("index",{userdata:data,email:req.session.email1})

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
const socketToUserIdMap={}
// const user=await User.findOne({email:"kumar@gmail.com"})
io.on('connection',socket =>{
    socket.on('new_user_joined',(userid)=>{ 
        socketToUserIdMap[socket.id] = userid;
        // console.log("name:",name) 
        console.log("userid",userid)       
        console.log("socketid=",socket.id)       
        console.log("socketid=",socketToUserIdMap)       
        // users[socket.id]=name
        socket.broadcast.emit('user-joined',(user.name,socket.id)); 
    })
    socket.on('clicked',(userid)=>{
        // socketToUserIdMap[socket.id] = userid;
        Object.keys(socketToUserIdMap).forEach(element => {
            console.log(element); 
            
        });
        console.log("hello i am :",userid)
 
    })
    socket.on('send',async (message,userid,name12)=>{
        // console.log("revid",socket) 
        // console.log("revid:",userid) 
        // const recipientSocket = io.sockets.sockets.find(
        //     userid
        //   );
        const recipientSocketId = await Object.keys(socketToUserIdMap).find(
            (socketId) => socketToUserIdMap[socketId] === userid
          );
          console.log("adsdf:",recipientSocketId)
          if (recipientSocketId) {
           io.to(recipientSocketId).emit('receive',{message:message,name:userid,name12:name12});
          }
          else{
            console.log("not send")
          }
    //    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leftchat',{name:users[socket.id]})
        delete users[socket.id]
    })
}) 


// module.exports=io
http.listen(port, () => console.log(`listening on port ${port}!`))
