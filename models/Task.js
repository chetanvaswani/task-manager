const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Must Provide a name."],
        trim:true,
        maxLength:[45, "Name cannot be more than 25 characters."]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task', TaskSchema)