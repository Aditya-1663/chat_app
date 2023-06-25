const connectToMongodb=require('./db')
const  express = require('express')
const sendmail=require('./route/mailsender')


var cors = require('cors')
var app = express()

app.use(cors())
const port = 3000
connectToMongodb();
app.use(express.json())

app.use('/user',require('./route/Usercreate'))
app.get('/sendmail',sendmail)
app.get('/', (req, res) => res.send('Hello World!'))






app.listen(port, () => console.log(`listening on port ${port}!`))
