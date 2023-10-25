const express = require('express');
const bodyParser = require('body-parser');

const apiGatewayRouter = require('./routes/index');
const studentMgmtRouter = require('./routes/basic-sch-mgnt/student');
const schoolSessionRouter = require('./routes/basic-sch-mgnt/schoolSession');
const schlTermRouter = require('./routes/basic-sch-mgnt/term');
const schoolSubjectRouter = require('./routes/basic-sch-mgnt/subject');
const classroomRouter = require('./routes/basic-sch-mgnt/classroom');
const schoolCurriculumRouter = require('./routes/basic-sch-mgnt/curriculum');
const studentAddressRouter = require('./routes/basic-sch-mgnt/studentAddress');
const employeeAddressRouter = require('./routes/basic-sch-mgnt/employeeAddress');
const parentRouter = require('./routes/basic-sch-mgnt/parent');

const schmsApp = express();

schmsApp.use(bodyParser.json());
schmsApp.use(apiGatewayRouter);
schmsApp.use('/api/v1/students/', studentMgmtRouter);
schmsApp.use('/api/v1/sessions/', schoolSessionRouter);
schmsApp.use('/api/v1/terms/', schlTermRouter);
schmsApp.use('/api/v1/subjects/', schoolSubjectRouter); 
schmsApp.use('/api/v1/curricula/', schoolCurriculumRouter);
schmsApp.use('/api/v1/classrooms/', classroomRouter);
schmsApp.use('/api/v1/stdaddresses/', studentAddressRouter);
schmsApp.use('/api/v1/empaddresses/', employeeAddressRouter);
schmsApp.use('/api/v1/parents/', parentRouter);

schmsApp.listen(process.env.PORT || 3000);