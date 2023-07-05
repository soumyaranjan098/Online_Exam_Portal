const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    registration_no:{
        type: Number,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{timestamps : true}
);

//we are hashing the password

userSchema.pre('save', async function(next){
    // console.log("hi from inside");
    if(this.isModified('password')){
         this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("users",userSchema);

module.exports = User;