const Result =require('../models/resultModel')
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');


exports.createResult = async (req, res, next) => {
  const newResult = await Result.create(req.body);
  // const url = `${req.protocol}://${req.get('host')}/api/v1/class`;
  // console.log(url);
  //await new Email(newTeacher, url).sendWelcome();
  res.status(201).json({
    status: 'success',
    data: {
      result: newResult
    }
  });
  
};


exports.getAllResult =  async(req, res, next) => {
  const results = await Result.find()
  


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
};