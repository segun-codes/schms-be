const express = require('express');
const termController = require('../../controllers/basic/termController');

const schoolTermRouter = express.Router();

schoolTermRouter.post('/', async (req, res) => {
    const schlTerm = req.body;
    const termWriteStatus = await termController.writeSchTerm(schlTerm); 
    
    res.status(termWriteStatus.code).send({        
        status: termWriteStatus.status, 
        message: termWriteStatus.message,
    });
});

schoolTermRouter.get('/:termId', async (req, res) => {
    const termId = req.params.termId;
    const schlTermData = await termController.retrieveSchlTerm(termId); 
    
    res.status(schlTermData.code).send({        
        status: schlTermData.status, 
        message: schlTermData.message,
        payload: schlTermData.payload
    });
});

schoolTermRouter.get('/', async (req, res) => {
    const schlTermData = await termController.retrieveAllSchlTerms(); 
    
    res.status(schlTermData.code).send({        
        status: schlTermData.status, 
        message: schlTermData.message,
        payload: schlTermData.payload
    });
});


schoolTermRouter.delete('/:termId', async (req, res) => {
    const termId = req.params.termId;
    const schlTermData = await termController.removeSchlTerm(termId); 

    res.status(schlTermData.code).send({ 
        status: schlTermData.status, 
        message: schlTermData.message 
    });
});


schoolTermRouter.patch('/', async (req, res) => {
    const termToUpdate = req.body;
    const uStatus = await termController.updateSchlTerm(termToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = schoolTermRouter;
