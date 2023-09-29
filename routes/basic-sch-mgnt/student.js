const express = require('express');
const bodyParser = require('body-parser')
const studentController = require('../../controllers/studentController');


const studentMgmtRouter = express.Router();

// retrieves a registered student given studentId
studentMgmtRouter.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const stdData = await studentController.retrieveStudent(studentId);

    res.status(stdData.code).send({ 
        status: stdData.status, 
        message: stdData.message, 
        payload: stdData.payload 
    });
});

// retrieves all registered students
studentMgmtRouter.get('/', async (req, res) => {
    const stdData = await studentController.retrieveAllStudents();
    
    res.status(stdData.code).send({ 
        status: stdData.status, 
        message: stdData.message, 
        payload: stdData.payload 
    });
});

// retrieves all students in a class given a sessionId, termId, classId, student id is gauranteed to be unique  20230001
studentMgmtRouter.get('/:schSessionId/:termId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students in given class retrieved'});
});

// retrieves all students in a class given a sessionId and classId, student id is gauranteed to be unique 20230001
studentMgmtRouter.get('/:schSessionId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students in given class retrieved'});
});

// retrieves a registered student given classId and studentId - alternative to the above
studentMgmtRouter.get('/:classId/:studentid', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all registered students in a school session given a schlSessionId
studentMgmtRouter.get('/:schSessionId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all registered students in a class given a schlSessionId and classId
studentMgmtRouter.get('/:schSessionId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all a registered students given schlSessionId, classId and studentId
studentMgmtRouter.get('/:schSessionId/:classId/:studentid', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all students registered for at least one session historical till date
studentMgmtRouter.get('/', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students retrieved'});
});

//  registering a new student. Creates profile for the student automatically
//  session and class must have been created as their corresponding ids will be required to perform the operation below
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
studentMgmtRouter.post('/', async (req, res) => {
    const student = req.body;
    const wStatus = await studentController.writeStudent(student.studentId, student.firstName, student.lastName);
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message 
    });
});

// update student profile
studentMgmtRouter.patch('/', async (req, res) => {
    const studentUpdate = req.body;
    const uStatus = await studentController.updateStudent(studentUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

// delete student profile
studentMgmtRouter.delete('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const dStatus = await studentController.deleteStudent(studentId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});

module.exports = studentMgmtRouter;