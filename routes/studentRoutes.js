const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(
  '/:id/upcoming',
  authController.protect,
  authController.restrictTo('admin', 'teacher','student'),
  studentController.getUpcoming,
);
router.use(
  '/:id/curated',
  authController.protect,
  authController.restrictTo('admin', 'teacher','student'),
  studentController.getCuratedResult,
);
// router
//   .route('/upcoming/:id')
//   .get(
//     '/upcoming/:id',
//     authController.protect,
//     authController.restrictTo('admin', 'teacher'),
//     studentController.getUpcoming,
//   );
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    studentController.getAllStudent,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'student'),
    studentController.createStudent,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'student'),
    studentController.getUpcoming,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'teacher', 'student'),
    studentController.uploadTourImages,
    studentController.resizeTourImages,
    studentController.updateStudent,
  );
// .delete(

//   teacherController.deleteTeacher
// );

module.exports = router;
