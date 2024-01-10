const connectDB = require('./db/connect')
const express = require('express');
const app = express()
require('dotenv').config()
const tasks = require('./routes/tasks')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/tasks', tasks)


const port = process.env.PORT || 9000;
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`app listening to port ${port}`)
        })
    } catch(err){
        console.log(err)
    }
}

start()