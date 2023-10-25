const express = require('express');
const classroomController = require('../../controllers/basic/classroomController');

const schoolClassroomRouter = express.Router();

schoolClassroomRouter.post('/', async (req, res) => {
    const schlClasroom = req.body;
    const classroomWriteStatus = await classroomController.writeSchlClassroom(schlClasroom); 
    
    res.status(classroomWriteStatus.code).send({        
        status: classroomWriteStatus.status, 
        message: classroomWriteStatus.message,
    });
});

schoolClassroomRouter.get('/:classId', async (req, res) => {
    const classId = req.params.classId;
    const schlClassroomData = await classroomController.retrieveSchlClassroom(classId); 
    
    res.status(schlClassroomData.code).send({        
        status: schlClassroomData.status, 
        message: schlClassroomData.message,
        payload: schlClassroomData.payload
    });
});

schoolClassroomRouter.get('/', async (req, res) => {
    const schlClassroomData = await classroomController.retrieveAllSchlClassrooms(); 
    
    res.status(schlClassroomData.code).send({        
        status: schlClassroomData.status, 
        message: schlClassroomData.message,
        payload: schlClassroomData.payload
    });
});


schoolClassroomRouter.delete('/:classId', async (req, res) => {
    const classId = req.params.classId;
    const schlClassroomData = await classroomController.removeSchlClassroom(classId); 

    res.status(schlClassroomData.code).send({ 
        status: schlClassroomData.status, 
        message: schlClassroomData.message 
    });
});


schoolClassroomRouter.patch('/', async (req, res) => {
    const classroomToUpdate = req.body;
    const uStatus = await classroomController.updateSchlClassroom(classroomToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = schoolClassroomRouter;
