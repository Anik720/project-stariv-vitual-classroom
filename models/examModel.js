const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
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

examSchema.virtual('examresult', {
  ref: 'Result',
  foreignField: 'examResult',
  localField: '_id',
});
const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;