const express = require('express');
const assignmentController=require('../controllers/assignmentController')
const authController = require('./../controllers/authController');

const router = express.Router();




router
  .route('/')
   .get(authController.protect, authController.restrictTo('admin','teacher'), assignmentController.getAllAssignment )
  .post(authController.protect, authController.restrictTo('admin','teacher'), assignmentController.createAssignment);

router.route('/:id').get(assignmentController.getAssignment);
//    .patch(teacherController.updateTeacher)
//   .delete(
  
//     teacherController.deleteTeacher
//   );

module.exports = router;
