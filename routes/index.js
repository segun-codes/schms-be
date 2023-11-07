const express = require('express');

const {isLogin, isSubscribed, getModuleSubscribed } = require('../utils/admin/getwayServices');
const isValidAPIKey = require('../utils/admin/tokenService').isValidAPIKey;

const apiGatewayRouter = express.Router();

//Doc
apiGatewayRouter.use((req, res, next) => {       
    if (!isValidAPIKey() || !isSubscribed()) {
        res.status(500).send({message: 'Not authorized to use this API system'});
        return;
    }

    console.log('A subcriber has logged in');
    const moduleSubscribed = getModuleSubscribed();
    
    for (const module of moduleSubscribed) {
        console.log(module);
    }

    next();
});


module.exports = apiGatewayRouter;