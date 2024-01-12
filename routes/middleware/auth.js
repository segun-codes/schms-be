const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv').config();
const verifyJWToken = require('../../utils/idGenerationService').verifyJWToken;
const retrieveSchool = require('../../controllers/admin/schoolController').retrieveSchool;
//const generateJWToken = require('../../utils/idGenerationService').generateJWToken;



const auth = async (req, res, next) => {

    try {
        const bToken = req.get('Authorization'); 
        const authToken = bToken.split(' ')[1].trim();
        const  result = verifyJWToken(authToken);
        const school = await retrieveSchool(result.schId);

        if (!school) {
            throw new Error();
        }

        req.token = authToken;
        req.school = school;
        next();

    } catch(err) {
        res.status(401).send({ error: 'Please login.' });
    }
}





module.exports = {
    auth,
};