const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    deadlines: String,
    lastSubmitTime: String,
    marks: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

assignmentSchema.virtual('assignmentresult', {
  ref: 'Result',
  foreignField: 'assignmentResult',
  localField: '_id',
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;