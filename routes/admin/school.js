const express = require('express');
const bodyParser = require('body-parser')
const schoolController = require('../../controllers/admin/schoolController');


const schoolRouter = express.Router();

// retrieves a registered school given schoolId
schoolRouter.get('/:schoolId', async (req, res) => {
    const schoolId = req.params.schoolId;
    const school = await schoolController.retrieveSchool(schoolId);

    res.status(school.code).send({ 
        status: school.status, 
        message: school.message, 
        payload: school.payload 
    });
});

// retrieves all registered schools
schoolRouter.get('/', async (req, res) => {
    const schools = await schoolController.retrieveAllSchools();
    
    res.status(schools.code).send({ 
        status: schools.status, 
        message: schools.message, 
        payload: schools.payload 
    });
});

//  registering a new school. Creates profile for the school automatically
schoolRouter.post('/', async (req, res) => {
    const school = req.body;
    const wStatus = await schoolController.writeSchool(school);
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message 
    });
});

// update school profile
schoolRouter.patch('/', async (req, res) => {
    const schoolUpdate = req.body;
    const uStatus = await schoolController.updateSchool(schoolUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

// delete school profile
schoolRouter.delete('/:schoolId', async (req, res) => {
    const schoolId = req.params.schoolId;
    const dStatus = await schoolController.removeSchool(schoolId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});

module.exports = schoolRouter;