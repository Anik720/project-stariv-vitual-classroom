const path = require('path');
const express = require('express');
const teacherRoutes=require('./routes/teacherRoute')
const classroomRoutes=require('./routes/classroomRoute')
const assignmentRoutes=require('./routes/assignmentRoutes')
const examRoutes=require('./routes/examRoutes')
const resultRoutes=require('./routes/resultRoutes')
const studentRoutes=require('./routes/studentRoutes')
const userRoutes=require('./routes/userRoutes')

const Email = require('./utils/email');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

const Student = require('./models/studentModel');
var cron = require('node-cron');
const schedule = require('node-schedule');

cron.schedule('* * * * *', async () => {
  a = await Student.find();
  a.map((x) => {
    b = x.enrollclass[0]?.assignment[0]?.deadlines;
    c = x.enrollclass[0]?.assignment[0]?.lastSubmitTime;
    const month = b?.slice(3, 5);
    const day = b?.slice(0, 2);
    const minutes = c?.slice(3);
    //  const minutes = userInput.slice(3);
    //  const minutes = userInput.slice(3);
    //console.log(x.email);
    // console.log('From c' + c);
    schedule.scheduleJob(`* * ${day} ${month} *`, async function () {
      const url = `http://localhost:3000/api/v1/`;
      // console.log(url);
      //await new Email(x, url).sendWelcome();
    });
  });
});
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/classroom', classroomRoutes);
app.use('/api/v1/assignment', assignmentRoutes);
app.use('/api/v1/exam', examRoutes);
app.use('/api/v1/result', resultRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/users', userRoutes);



module.exports = app;