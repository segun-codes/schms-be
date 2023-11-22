const express = require('express');
const curriculumController = require('../../controllers/basic/curriculumController');

const schoolCurriculumRouter = express.Router();

schoolCurriculumRouter.post('/', async (req, res) => {
    const curriculum = req.body;
    const curriculumWriteStatus = await curriculumController.writeSchlCurriculum(curriculum); 
    
    res.status(curriculumWriteStatus.code).send({        
        status: curriculumWriteStatus.status, 
        message: curriculumWriteStatus.message,
        curriculumId: curriculumWriteStatus.curriculumId,
    });
});

schoolCurriculumRouter.get('/:curriculumId', async (req, res) => {
    const curriculumId = req.params.curriculumId;
    const schlCurriculumData = await curriculumController.retrieveSchlCurriculum(curriculumId); 
    
    res.status(schlCurriculumData.code).send({        
        status: schlCurriculumData.status, 
        message: schlCurriculumData.message,
        payload: schlCurriculumData.payload
    });
});

schoolCurriculumRouter.get('/', async (req, res) => {
    const schlCurriculumData = await curriculumController.retrieveAllSchlCurricula(); 
    
    res.status(schlCurriculumData.code).send({        
        status: schlCurriculumData.status, 
        message: schlCurriculumData.message,
        payload: schlCurriculumData.payload
    });
});

schoolCurriculumRouter.delete('/:curriculumId', async (req, res) => {
    const curriculumId = req.params.curriculumId;
    const schlCurriculumData = await curriculumController.removeSchlCurriculum(curriculumId); 

    res.status(schlCurriculumData.code).send({ 
        status: schlCurriculumData.status, 
        message: schlCurriculumData.message 
    });
});

schoolCurriculumRouter.patch('/', async (req, res) => {
    const curriculumToUpdate = req.body;
    const uStatus = await curriculumController.updateSchlCurriculum(curriculumToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = schoolCurriculumRouter;
