const express = require('express');
const studentAddressController = require('../../controllers/basic/studentAddressController');

const studentAddressRouter = express.Router();

studentAddressRouter.post('/', async (req, res) => {
    const address = req.body;
    const addressWriteStatus = await studentAddressController.writeAddress(address); 
    
    res.status(addressWriteStatus.code).send({        
        status: addressWriteStatus.status, 
        message: addressWriteStatus.message,
    });
});

studentAddressRouter.get('/:stdAddressId', async (req, res) => {
    const stdAddressId = req.params.stdAddressId;
    const addressData = await studentAddressController.retrieveAddress(stdAddressId); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});

studentAddressRouter.get('/', async (req, res) => {
    const addressData = await studentAddressController.retrieveAllAddresses(); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});


studentAddressRouter.delete('/:addressId', async (req, res) => {
    const addressId = req.params.addressId;
    const addressData = await studentAddressController.removeAddress(addressId); 

    res.status(addressData.code).send({ 
        status: addressData.status, 
        message: addressData.message 
    });
});

studentAddressRouter.patch('/', async (req, res) => {
    const addressToUpdate = req.body;
    const uStatus = await studentAddressController.updateAddress(addressToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = studentAddressRouter;
