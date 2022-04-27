const Teacher = require('../models/teacherModel');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
exports.createTeacher = async (req, res, next) => {
  const newTeacher = await Teacher.create({
    name: req.body.name,
    email: req.body.email,

    role: req.body.role,
  });
  const url = `${req.protocol}://${req.get('host')}/api/v1/teacher`;
  console.log(url);
  await new Email(newTeacher, url).sendWelcome();
  res.status(201).json({
    status: 'success',
    data: {
      teacher: newTeacher,
    },
  });
};
exports.getAllTeacher = async (req, res, next) => {
  const teachers = await Teacher.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: Teacher.length,
    data: {
      teachers,
    },
  });
};

exports.getTeacher = async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      teacher,
    },
  });
};

exports.updateTeacher = async (req, res, next) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      teacher,
    },
  });
};

exports.deleteTeacher = async (req, res, next) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
