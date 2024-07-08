const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        // required: [true, 'Username is required'],
        // unique: true,
        // trim: true,
        // minlength: [3, 'Username must be at least 3 characters long'],
        // maxlength: [30, 'Username cannot be more than 30 characters long'],
        // match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
},
name: {
        type: String,
        // required: [true, 'Name is required'],
        // trim: true,
        // minlength: [1, 'Name must be at least 1 character long'],
        // maxlength: [100, 'Name cannot be more than 100 characters long']
      },
      profilePicture: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg)$/, 'Profile picture must be a valid URL of an image']
      },
      email: {
        type: String,
        // required: [true, 'Email is required'],
        // unique: true,
        // trim: true,
        // lowercase: true,
        // match: [/^\S+@\S+\.\S+$/, 'Email must be a valid email address']
      },
      password: {
        type: String,
        required: [false, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password cannot be more than 128 characters long',
          
        ],
        // select:false
      },
    hisaab:[{
        type:mongoose.Schema.Types.ObjectId, ref:"hisaab"
    }]
});

module.exports = mongoose.model("user",userSchema);