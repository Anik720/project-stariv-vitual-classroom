const Classroom =require('../models/classroomModel')
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
exports.createClassroom = async (req, res, next) => {
  const newClassroom = await Classroom.create(req.body);
  // const url = `${req.protocol}://${req.get('host')}/api/v1/class`;
  // console.log(url);
  //await new Email(newTeacher, url).sendWelcome();
  res.status(201).json({
    status: 'success',
    data: {
      classroom: newClassroom
    }
  });
  
};
exports.getAllClassroom =  async(req, res, next) => {
  const classrooms = await Classroom.find().select('-enrollclass').populate('student')
  


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: classrooms.length,
    data: {
      classrooms
    }
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
      teacher
    }
  });
};

exports.updateClassroom = async (req, res, next) => {
  const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!classroom) {
    return next(new AppError('No classroom found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      classroom,
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
    data: null
  });
};
