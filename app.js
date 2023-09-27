const express = require('express');
const bodyParser = require('body-parser');

const apiGatewayRouter = require('./routes/index');
const studentMgmtRouter = require('./routes/basic-sch-mgnt/student');

const schmsApp = express();

schmsApp.use(bodyParser.json());
schmsApp.use(apiGatewayRouter);
schmsApp.use('/api/v1/students/', studentMgmtRouter);

schmsApp.listen(process.env.PORT || 3000);