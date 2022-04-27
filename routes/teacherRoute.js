const express = require('express');
const teacherController = require('../controllers/teacherController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    teacherController.getAllTeacher,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    teacherController.createTeacher,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    teacherController.getTeacher,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    teacherController.updateTeacher,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    teacherController.deleteTeacher,
  );

module.exports = router;
