const express = require('express');
const { isValidAPIKey, isLogin, isSubscribed, getModuleSubscribed } = require('../utils/getwayServices');
const apiGatewayRouter = express.Router();

//Doc
apiGatewayRouter.use((req, res, next) => {       
    const isValidKey = isValidAPIKey();

    if (!isValidKey || !isSubscribed) {
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