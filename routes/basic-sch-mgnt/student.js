const express = require('express');
const bodyParser = require('body-parser')
const studentController = require('../../controllers/basic/studentController');


const studentRouter = express.Router();

// retrieves a registered student given studentId
studentRouter.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const student = await studentController.retrieveStudent(studentId);

    res.status(student.code).send({ 
        status: student.status, 
        message: student.message, 
        payload: student.payload 
    });
});

// retrieves all registered students
studentRouter.get('/', async (req, res) => {
    const students = await studentController.retrieveAllStudents();
    
    res.status(students.code).send({ 
        status: students.status, 
        message: students.message, 
        payload: students.payload 
    });
});

// retrieves all students in a class given a sessionId, termId, classId, student id is gauranteed to be unique  20230001
studentRouter.get('/:schSessionId/:termId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students in given class retrieved'});
});

// retrieves all students in a class given a sessionId and classId, student id is gauranteed to be unique 20230001
studentRouter.get('/:schSessionId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students in given class retrieved'});
});

// retrieves a registered student given classId and studentId - alternative to the above
studentRouter.get('/:classId/:studentid', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all registered students in a school session given a schlSessionId
studentRouter.get('/:schSessionId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all registered students in a class given a schlSessionId and classId
studentRouter.get('/:schSessionId/:classId', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all a registered students given schlSessionId, classId and studentId
studentRouter.get('/:schSessionId/:classId/:studentid', (req, res) => {
    res.status(500).send({code: 1001, status: 'all student in given class retrieved'});
});

// retrieves all students registered for at least one session historical till date
studentRouter.get('/', (req, res) => {
    res.status(500).send({code: 1001, status: 'all students retrieved'});
});

//  registering a new student. Creates profile for the student automatically
//  session and class must have been created as their corresponding ids will be required to perform the operation below
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
studentRouter.post('/', async (req, res) => {
    const student = req.body;
    const wStatus = await studentController.writeStudent(student);
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message 
    });
});

// update student profile
studentRouter.patch('/', async (req, res) => {
    const studentUpdate = req.body;
    const uStatus = await studentController.updateStudent(studentUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

// delete student profile
studentRouter.delete('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const dStatus = await studentController.removeStudent(studentId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});

module.exports = studentRouter;