
var mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required: true,
  
    },
    cpswd:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model('User',userSchema);