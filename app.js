const express = require('express');
const bodyParser = require('body-parser');

const apiGatewayRouter = require('./routes/gateway');
const studentRouter = require('./routes/basic-sch-mgnt/student');
const employeeRouter = require('./routes/basic-sch-mgnt/employee');
const schoolSessionRouter = require('./routes/basic-sch-mgnt/schoolSession');
const schlTermRouter = require('./routes/basic-sch-mgnt/term');
const schoolSubjectRouter = require('./routes/basic-sch-mgnt/subject');
const classroomRouter = require('./routes/basic-sch-mgnt/classroom');
const schoolCurriculumRouter = require('./routes/basic-sch-mgnt/curriculum');
const addressRouter = require('./routes/basic-sch-mgnt/address');
const parentRouter = require('./routes/basic-sch-mgnt/parent');
const schoolRouter = require('./routes/admin/school');

const schmsApp = express();

schmsApp.use(bodyParser.json());
schmsApp.use(apiGatewayRouter);
schmsApp.use('/api/v1/schools/', schoolRouter);
schmsApp.use('/api/v1/sessions/', schoolSessionRouter);
schmsApp.use('/api/v1/terms/', schlTermRouter);
schmsApp.use('/api/v1/students/', studentRouter);
schmsApp.use('/api/v1/employees/', employeeRouter);
schmsApp.use('/api/v1/subjects/', schoolSubjectRouter); 
schmsApp.use('/api/v1/curricula/', schoolCurriculumRouter);
schmsApp.use('/api/v1/classrooms/', classroomRouter);
schmsApp.use('/api/v1/addresses/', addressRouter);
schmsApp.use('/api/v1/parents/', parentRouter);


module.exports = schmsApp;