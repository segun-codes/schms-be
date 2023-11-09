const express = require('express');
const addressController = require('../../controllers/basic/addressController');

const addressRouter = express.Router();

addressRouter.post('/', async (req, res) => {
    const address = req.body;
    const addressWriteStatus = await addressController.writeAddress(address); 
    
    res.status(addressWriteStatus.code).send({        
        status: addressWriteStatus.status, 
        message: addressWriteStatus.message,
    });
});

addressRouter.get('/:addressId', async (req, res) => {
    const addressId = req.params.addressId;
    const addressData = await addressController.retrieveAddress(addressId); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});

addressRouter.get('/', async (req, res) => {
    const addressData = await addressController.retrieveAllAddresses(); 
    
    res.status(addressData.code).send({        
        status: addressData.status, 
        message: addressData.message,
        payload: addressData.payload
    });
});


addressRouter.delete('/:addressId', async (req, res) => {
    const addressId = req.params.addressId;
    const addressData = await addressController.removeAddress(addressId); 

    res.status(addressData.code).send({ 
        status: addressData.status, 
        message: addressData.message 
    });
});

addressRouter.patch('/', async (req, res) => {
    const addressToUpdate = req.body;
    const uStatus = await addressController.updateAddress(addressToUpdate); 

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

module.exports = addressRouter;
