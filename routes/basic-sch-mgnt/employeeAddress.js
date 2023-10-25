const express = require('express');
const employeeAddressController = require('../../controllers/basic/employeeAddressController');

const employeeAddressRouter = express.Router();

employeeAddressRouter.post('/', async (req, res) => {
    const address = req.body;
    const addressWriteStatus = await employeeAddressController.writeAddress(address); 
    
    res.status(addressWriteStatus.code).send({        
        status: addressWriteStatus.status, 
        message: addressWriteStatus.message,
    });
});

employeeAddressRouter.get('/:empAddressId', async (req, res) => {
    const empAddressId = req.params.empAddressId;
    const addressData = await employeeAddressController.retrieveAddress(empAddressId); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});

employeeAddressRouter.get('/', async (req, res) => {
    const addressData = await employeeAddressController.retrieveAllAddresses(); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});


employeeAddressRouter.delete('/:empAddressId', async (req, res) => {
    const empAddressId = req.params.empAddressId;
    const addressData = await employeeAddressController.removeAddress(empAddressId); 

    res.status(addressData.code).send({ 
        status: addressData.status, 
        message: addressData.message 
    });
});

employeeAddressRouter.patch('/', async (req, res) => {
    const addressToUpdate = req.body;
    const uStatus = await employeeAddressController.updateAddress(addressToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = employeeAddressRouter;
