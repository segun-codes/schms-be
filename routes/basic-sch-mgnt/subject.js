const express = require('express');
const subjectController = require('../../controllers/basic/subjectController');

const schoolSubjectRouter = express.Router();

schoolSubjectRouter.post('/', async (req, res) => {
    const subject = req.body;
    const subjectWriteStatus = await subjectController.writeSchlSubject(subject); 
    
    res.status(subjectWriteStatus.code).send({        
        status: subjectWriteStatus.status, 
        message: subjectWriteStatus.message,
    });
});

schoolSubjectRouter.get('/:subjectId', async (req, res) => {
    const subjectId = req.params.subjectId;
    const schlSubjectData = await subjectController.retrieveSchlSubject(subjectId); 
    
    res.status(schlSubjectData.code).send({        
        status: schlSubjectData.status, 
        message: schlSubjectData.message,
        payload: schlSubjectData.payload
    });
});

schoolSubjectRouter.get('/', async (req, res) => {
    const schlSubjectData = await subjectController.retrieveAllSchlSubjects(); 
    
    res.status(schlSubjectData.code).send({        
        status: schlSubjectData.status, 
        message: schlSubjectData.message,
        payload: schlSubjectData.payload
    });
});

schoolSubjectRouter.delete('/:subjectId', async (req, res) => {
    const subjectId = req.params.subjectId;
    const schlSubjectData = await subjectController.removeSchlSubject(subjectId); 

    res.status(schlSubjectData.code).send({ 
        status: schlSubjectData.status, 
        message: schlSubjectData.message 
    });
});


schoolSubjectRouter.patch('/', async (req, res) => {
    const subjectToUpdate = req.body;
    const uStatus = await subjectController.updateSchlSubject(subjectToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = schoolSubjectRouter;
