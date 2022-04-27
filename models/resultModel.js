const mongoose = require('mongoose');
const Assignment = require('./../models/assignmentModel');
const resultSchema = new mongoose.Schema({
  name: String,
  marks: Number,
  assignmentResult: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Assignment',
    },
  ],
  examResult: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Exam',
    },
  ],
});

// resultSchema.pre('save', async function(next) {
//   const guidesPromises = this.assignmentResult.map(async id => await Assignment.findById(id));
//   this.assignmentResult = await Promise.all(guidesPromises);
//   next();
// });

resultSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'assignmentResult',
  });

  next();
});

resultSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'examResult',
  });

  next();
});
const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
