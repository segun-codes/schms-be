const express = require('express');
const bodyParser = require('body-parser')
const studentController = require('../../controllers/studentController');


const studentMgmtRouter = express.Router();

// retrieves a registered student given studentId
studentMgmtRouter.get('/:studentId', async (req, res) => {
    const studentId = +req.params.studentId;
    const studentData = await studentController.retrieveStudent(studentId);

    if (!studentData.length) {
        res.status(404).send({status: 'failed', message: 'student not found'});
    } else {
        res.status(200).send({
            status: 'success',
            payload: {
                id: studentData[0].student_id,
                firstName: studentData[0].first_name,
                lastName: studentData[0].last_name
            }
        });
    }
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
    const rowCount = await studentController.writeStudent(student.firstName, student.lastName);

    if (!rowCount) {
        res.status(400).send({status: 'failed', message: 'student not registered' });   
    }
    
    res.status(201).send({status: 'success', message: 'student registered'});
});

// update student profile
studentMgmtRouter.patch('/', async (req, res) => {
    const studentUpdate = req.body;

    const updatedRowCount = await studentController.updateStudent(studentUpdate);

    if (!updatedRowCount) {
        res.status(400).send({status: 'failed', status: 'student not updated'});
    }

    res.status(201).send({status: 'success', status: 'student updated'});
});

// delete student profile
studentMgmtRouter.delete('/:studentId', async (req, res) => {
    const studentId = +req.params.studentId;
    const deleteCount = await studentController.deleteStudent(studentId);

    let responseCode = 400;
    let statusMsge = 'failed';
    let msge = 'no student to delete';

    if (deleteCount) {
        responseCode = 200;
        statusMsge = 'success';
        msge = 'student deleted'
    }

    res.status(responseCode).send({status: statusMsge, message: msge});
});

module.exports = studentMgmtRouter;