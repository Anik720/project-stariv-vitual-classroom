const res = require('express/lib/response');
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AppError = require('./../utils/appError');
const Classroom = require('./../models/classroomModel');

const studentSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    schoolId: String,

    images: [String],
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    enrollclass: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Classroom',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

studentSchema.pre('save', async function (next) {
  const guidesPromises = this.enrollclass.map(
    async (id) => await Classroom.findById(id),
  );

  const a = await Promise.all(guidesPromises);
  console.log(a);
  a.forEach((x) => {
    if (x.code != this.code) {
      next(new AppError('invalid class code', 404));
    }
  });
});
studentSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field

  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  console.log('student' + candidatePassword);
  console.log('student' + userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

studentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'enrollclass',
    //select:'assignment exams _id teacher subject'
  });

  next();
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
