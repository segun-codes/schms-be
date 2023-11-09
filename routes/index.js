const express = require('express');
const isTableExist = require('../model/model-utils/schemaUtils').isTableExist;
const {isLogin, isSubscribed, getModuleSubscribed } = require('../utils/admin/getwayServices');
const isValidAPIKey = require('../utils/admin/tokenService').isValidAPIKey;
const isValidAdminAPIKey = require('../utils/admin/tokenService').isValidAdminAPIKey;

const apiGatewayRouter = express.Router();

/**
 * Default API Gateway middleware
 */
apiGatewayRouter.use(async (req, res, next) => {    
    let keyIsValid = false;
    const adminApiKey = req.body.adminApiKey;
    const userApiKey = req.body.apiKey;

    // validate API key
    if (adminApiKey) {
        if (!isValidAPIKey(adminApiKey, 'ADMIN')) {
            res.status(500).send({message: 'You are not authorized to use this API system-ADMIN'});
            return;
        }   
    } else if (userApiKey) {
        if (!isValidAPIKey(userApiKey, 'USER')) {
            res.status(500).send({message: 'You are not authorized to use this API system'});
            return;
        }   
    } else if (!adminApiKey && !userApiKey) {
                    res.status(500).send({message: 'Subscribe to API system to get API Key first. Contact Segun at sa@io.com'});
            return;
    }
    
    // force user to setup school profile first
    if (!adminApiKey) {
        const tableExists = await isTableExist('schools');
        if (!tableExists) {
            res.status(500).send({status: 'failed', message: 'Setup a school profile first and try again'});
            return;
        }
    }
    
        
    console.log('A subcriber has logged in');
    // Placeholder code
    const moduleSubscribed = getModuleSubscribed();
    for (const module of moduleSubscribed) {
        //    
        console.log(module);
    }

    next();
});


module.exports = apiGatewayRouter;