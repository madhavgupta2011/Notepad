const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:false
    }

})


//Exporting the Model Note to be used in other files
module.exports = mongoose.model('Note',noteSchema);