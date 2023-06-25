const connectToMongodb=require('./db')
const  express = require('express')
const sendmail=require('./route/mailsender')
var jwt = require('jsonwebtoken');
const User = require('./schema/createuser')


var cors = require('cors')
var app = express()

app.use(cors())
const port = 3000
connectToMongodb();
app.use(express.json())

const jwtscrect="adityakumarisagoodboy"
app.use('/user',require('./route/Usercreate'))
app.get('/verifying/:token',async(req,res)=>{
    try {
        const data = jwt.verify(req.params.token,jwtscrect)
        await User.findByIdAndUpdate(data.user.id,{$set:{confirm:true}},{new:true})
        res.redirect('http://localhost:3000/index.html')
    } catch (error) {
        console.log(error)
        
        
    }

})
app.get('/', (req, res) => res.send('Hello World!'))






app.listen(port, () => console.log(`listening on port ${port}!`))
