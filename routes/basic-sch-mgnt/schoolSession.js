const express = require('express');
const sessionController = require('../../controllers/basic/sessionController');

const schoolSessionRouter = express.Router();


schoolSessionRouter.get('/:schlSessYr', async (req, res) => {
    const schSessYear = req.params.schlSessYr;
    const schlSessData = await sessionController.retrieveSchlSession(schSessYear); 
    
    res.status(200).send({        
        status: schlSessData.status, 
        message: schlSessData.message,
        payload: schlSessData.payload
    });
});

schoolSessionRouter.get('/', async (req, res) => {
    const schlSessData = await sessionController.retrieveAllSchlSessions();

    res.status(schlSessData.code).send({        
        status: schlSessData.status, 
        message: schlSessData.message,
        payload: schlSessData.payload, 
    });
});

schoolSessionRouter.post('/', async (req, res) => {
    const schlSessionData = req.body;
    const writeStatus = await sessionController.writeSchlSession(schlSessionData);

    res.status(writeStatus.code).send({ 
        status: writeStatus.status, 
        message: writeStatus.message 
    });
});

schoolSessionRouter.delete('/:schSessYear', async (req, res) => {
    const schlSessYear = req.params.schSessYear;
    const deleteStatus = await sessionController.removeSchlSession(schlSessYear);

    res.status(deleteStatus.code).send({        
        status: deleteStatus.status, 
        message: deleteStatus.message
    });
});

schoolSessionRouter.patch('/', async (req, res) => {
    const schlSessUpdate = req.body;
    
    const updateStatus = await sessionController.updateSchlSession(schlSessUpdate);

    res.status(updateStatus.code).send({        
        status: updateStatus.status, 
        message: updateStatus.message
    });
});

module.exports = schoolSessionRouter;