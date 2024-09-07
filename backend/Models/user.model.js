import { Schema , model } from "mongoose";
import {config} from "dotenv";
config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const userSchema = new Schema({
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [5, 'Name must be at least 5 characters'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ], // Matches email against regex
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Will not select password upon looking up a document
    },
    phoneNumber :{
        type : String,
        required : [true, "Phone number is required"],
        match: [
            /^[6-9]\d{9}$/, // Regex for Indian phone number
            'Please enter a valid 10-digit Indian phone number' 
        ],
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

//Hashes password before saving to the database
userSchema.pre('save' , async function (next){
  //if password is not modified then do not hash it
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password , 10);
});

userSchema.methods = {
  //method which will help us compare plain password with hashed password and returns true or false
  comparePassword : async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password);
  },

  generatePasswordResetToken : async function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },

  //will generate a JWT Token with user id as payload 
  generateJWTToken : async function(){
    return await jwt.sign(
      {id : this._id },
      process.env.JWT_SECRET,

      {
        expiresIn : process.env.JWT_EXPIRY,
      }
    );
  },
}

const User = model("user" , userSchema);

export default User;