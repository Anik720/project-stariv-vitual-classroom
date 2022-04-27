const Exam =require('../models/examModel')
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');


exports.createExam = async (req, res, next) => {
  const newExam = await Exam.create(req.body);
  // const url = `${req.protocol}://${req.get('host')}/api/v1/class`;
  // console.log(url);
  //await new Email(newTeacher, url).sendWelcome();
  res.status(201).json({
    status: 'success',
    data: {
      exam: newExam
    }
  });
  
};

exports.getAllExam = async (req, res, next) => {
  const exams = await Exam.find().populate('examresult');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: exams.length,
    data: {
      exams,
    },
  });
};

exports.updateExam = async (req, res, next) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exam) {
    return next(new AppError('No exam found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      exam,
    },
  });
};