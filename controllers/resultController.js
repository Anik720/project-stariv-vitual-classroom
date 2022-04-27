const Result = require('../models/resultModel');
const AppError = require('./../utils/appError');

exports.createResult = async (req, res, next) => {
  const newResult = await Result.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      result: newResult,
    },
  });
};

exports.getAllResult = async (req, res, next) => {
  const results = await Result.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results,
    },
  });
};
