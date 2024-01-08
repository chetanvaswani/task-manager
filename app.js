const connectDB = require('./db/connect')
const express = require('express');
const app = express()
require('dotenv').config()
const tasks = require('./controllers/tasks')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/tasks', tasks)


const PORT = 9000
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`app listening to port ${PORT}`)
        })
    } catch(err){
        console.log(err)
    }
}

start()