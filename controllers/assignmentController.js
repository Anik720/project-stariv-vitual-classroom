const Assignment =require('../models/assignmentModel')
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');


exports.createAssignment = async (req, res, next) => {
  const newAssignment = await Assignment.create(req.body);
  // const url = `${req.protocol}://${req.get('host')}/api/v1/class`;
  // console.log(url);
  //await new Email(newTeacher, url).sendWelcome();
  res.status(201).json({
    status: 'success',
    data: {
      assignment: newAssignment
    }
  });
  
};

exports.getAssignment = async (req, res, next) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    return next(new AppError('No assignment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      assignment,
    },
  });
};
exports.getAllAssignment = async (req, res, next) => {
  const assignments = await Assignment.find().populate('assignmentresult');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: assignments.length,
    data: {
      assignments,
    },
  });
};