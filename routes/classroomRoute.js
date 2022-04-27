const express = require('express');
const classroomController = require('../controllers/classroomController');
const authController = require('./../controllers/authController');

const router = express.Router();

// authController.protect, authController.restrictTo('admin'),

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    classroomController.getAllClassroom,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),

    classroomController.createClassroom,
  );

router
  .route('/:id')

  .patch(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    classroomController.updateClassroom,
  );
//   .delete(

//     teacherController.deleteTeacher
//   );

module.exports = router;
