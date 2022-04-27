const Student =require('../models/studentModel')
const Assignment = require('../models/assignmentModel');
const Exam = require('../models/examModel');
const Classroom = require('./../models/classroomModel');
const AppError = require('./../utils/appError');
const multer = require('multer');
const sharp = require('sharp');
const Email = require('./../utils/email');
const catchAsync = require('./../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype.startsWith('application')
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'pdf', maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  //console.log(req.files.pdf);
  // if (!req.files.images || !req.files.pdf) return next();
  if (req.files.pdf) {
    const filename = `pdf-${req.params.id}-${Date.now()}-.pdf`;
    console.log(filename);

    req.body.images = req.files.pdf[0].buffer + filename;
    return next();
  }

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `img-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/images/${filename}`);

      req.body.images.push(filename);
    }),
  );

  next();
});

exports.createStudent = async (req, res, next) => {
  const newStudent = await Student.create(req.body);
  // const url = `${req.protocol}://${req.get('host')}/api/v1/class`;
  // console.log(url);
  //await new Email(newTeacher, url).sendWelcome();

  res.status(201).json({
    status: 'success',
    data: {
      student: newStudent,
    },
  });
};

exports.getAllStudent = async (req, res, next) => {
  const students = await Student.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  });
};
exports.getUpcoming = async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }
  const upcomingExam = student.enrollclass[0].exams[0].deadlines;
  const b = student.enrollclass[0].assignment[0].deadlines;
  //console.log(b)
  res.status(200).json({
    status: 'success',
    data: {
      upcomingExam,
    },
  });
};

exports.updateStudent = async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
};
exports.getCuratedResult = async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  const id = student.enrollclass[0].assignment[0].id;
  const id2 = student.enrollclass[0].exams[0].id;
  //console.log(id2);

  const assignment = await Assignment.find().populate('assignmentresult');
  const exam = await Exam.find().populate('examresult');
  //console.log(exam);
  var assignmentfind = assignment.find((x) => id === x.id);
  const Assignmentresult = assignmentfind.assignmentresult[0].marks;
  // console.log(exam);
  var examfind = exam.find((x) => id2 === x.id);
  const examresult = examfind.examresult[0].marks;
  console.log(examresult);
  res.status(200).json({ Assignmentresult, examresult });
};
