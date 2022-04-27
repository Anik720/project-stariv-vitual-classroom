const express = require('express');
const resultController=require('../controllers/resultController')
const authController = require('./../controllers/authController');

const router = express.Router();




router
  .route('/')
   .get(authController.protect, authController.restrictTo('admin','teacher'), resultController.getAllResult )
  .post(authController.protect, authController.restrictTo('admin','teacher'), resultController.createResult);

// router
//   .route('/:id')
//   .get(teacherController.getTeacher)
//    .patch(teacherController.updateTeacher)
//   .delete(
  
//     teacherController.deleteTeacher
//   );

module.exports = router;
