const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Student = require('./../models/studentModel');
const Teacher = require('./../models/teacherModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Student.create(req.body);
  // name: req.body.name,
  // email: req.body.email,
  // password: req.body.password,
  // code: req.body.code
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user1 = await User.findOne({ email }).select('+password');
  const user2 = await Student.findOne({ email }).select('+password');
  const user3 = await Teacher.findOne({ email }).select('+password');

  console.log(user1);
  const check1 = await user1?.correctPassword(password, user1.password);
  console.log('chek1' + check1);
  const check2 = await user2?.correctPassword(password, user2.password);
  console.log('chek2' + check2);
  const check3 = await user3?.correctPassword(password, user3.password);
  console.log('chek3' + check3);
  if (check1 === false || check2 === false || check3 === false) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // if ( !(await user1.correctPassword(password, user1.password))) {
  //    next(new AppError('Incorrect email or password', 401));
  // }
  // else if ( !(await user2.correctPassword(password, user2.password))) {
  //    next(new AppError('Incorrect email or password', 401));
  // }
  // else if ( !(await user3.correctPassword(password, user3.password))) {
  //    next(new AppError('Incorrect email or password', 401));
  // }

  // 3) If everything ok, send token to client
  console.log(user3);
  createSendToken(user1 || user2 || user3, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser =
    (await User.findById(decoded.id)) ||
    (await Student.findById(decoded.id)) ||
    (await Teacher.findById(decoded.id));

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401),
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};
