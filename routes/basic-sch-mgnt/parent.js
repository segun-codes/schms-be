const express = require('express');
const bodyParser = require('body-parser')
const parentController = require('../../controllers/basic/parentController');


const parentRouter = express.Router();


parentRouter.get('/:parentId', async (req, res) => {
    const parentId = req.params.parentId;
    const parent = await parentController.retrieveParent(parentId);

    res.status(parent.code).send({ 
        status: parent.status, 
        message: parent.message, 
        payload: parent.payload 
    });
});

// retrieves all registered parents
parentRouter.get('/', async (req, res) => {
    const parents = await parentController.retrieveAllParents();
    
    res.status(parents.code).send({ 
        status: parents.status, 
        message: parents.message, 
        payload: parents.payload 
    });
});

parentRouter.post('/', async (req, res) => {
    const parent = req.body;
    const wStatus = await parentController.writeParent(parent);
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message,
        newParentId: wStatus.parentId 
    });
});

// update parent profile
parentRouter.patch('/', async (req, res) => {
    const parentUpdate = req.body;
    const uStatus = await parentController.updateParent(parentUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

// delete parent profile
parentRouter.delete('/:parentId', async (req, res) => {
    const parentId = req.params.parentId;
    const dStatus = await parentController.removeParent(parentId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});

module.exports = parentRouter;