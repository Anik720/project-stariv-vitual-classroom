const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const teacherSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  code: String,
  password: {
    type: String,

    select: false,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
});

teacherSchema.pre('save', async function(next) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var passwordLength = 12;
   var password = "";
   let password2 
   for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   
    
  }
  password2 = password
  this.code=password2
  this.password = await bcrypt.hash(password2, 12);
   


  next();
});
teacherSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  console.log("teacher"+candidatePassword)
  console.log("teacher"+userPassword)
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
