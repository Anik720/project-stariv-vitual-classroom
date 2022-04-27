const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  teacher:String,
  subject:String,
  
  code:String,
  
  assignment:[
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Assignment'
    }
  ],
  exams:[
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Exam',
      select:"deadlines"
    }
  ],

},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

classroomSchema.virtual('student', {
  ref: 'Student',
  foreignField: 'enrollclass',
  localField: '_id'
});
classroomSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'assignment',
    select:'deadlines marks'
  });

  next();
});
classroomSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'exams',
    select:'deadlines _id marks'
  });

  next();
});



classroomSchema.pre('save', async function(next) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var codeLength = 12;
   var code = "";
   for (var i = 0; i <= codeLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    code += chars.substring(randomNumber, randomNumber +1);
  }

  this.code = code


  next();
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;
