const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const auth = require('../middleware/auth').auth;
const schoolController = require('../../controllers/admin/schoolController');



const schoolRouter = express.Router();
const upload = multer({
    dest: process.env.TMP_FILE_UPLOADED_STORAGE, // To do: push to google drive
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload jpeg, jpg or png file'));
    }
        cb(undefined, true); // tells multer that uploaded image is accepted
    },
});

// api to independently upload
schoolRouter.post('/profile/upload', upload.single('profilePix'), async (req, res) => { 
    const renamedfile = schoolController.renameUploadedFile(req.file);
    renamedfile.mimetype = req.file.mimetype;
    schoolController.sendFileToGoogleCloudDrive(renamedfile);

    res.send( { message: 'upload completed' } );
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message});
});

// api to independently download
schoolRouter.get('/profile/download/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    schoolController.downloadFileFromGoogleDrive(fileId);
});

 

// schoolRouter.delete('/profile/upload', auth, async (req, res) => {
//     //update db, delete the entry for column 'profile-pix'
// });


//Sign-up with profile photo 
// schoolRouter.post('/signup', upload.single('profilePix'), async (req, res) => {
//     const school = req.body;
//     school.profilePix = req.file.buffer;
  
//     console.log('school.profilePix: ', school.profilePix);

//    const wStatus = await schoolController.writeSchool(school);
//     let response = { status: wStatus.status, message: wStatus.message };

//     // review the need for this
//     if (wStatus.authToken) {
//         response.token = wStatus.authToken;
//     } 

//     res.status(wStatus.code).send(response);
// }, (err, req, res, next) => {
//     res.status(400).send({ error: err.message});
//});


// Sign-up without profile photo
schoolRouter.post('/signup', async (req, res) => {
    const school = req.body;
    
    const wStatus = await schoolController.writeSchool(school);
    let response = { status: wStatus.status, message: wStatus.message };

    if (wStatus.authToken) {
        response.token = wStatus.authToken;
    } 

    res.status(wStatus.code).send(response);
});


schoolRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const wStatus = await schoolController.performLogin(username, password);

    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message,
        token: wStatus.authToken
    });
});


schoolRouter.post('/reset', async (req, res) => {

});


schoolRouter.get('/logout', auth, async (req, res) => {
    const data = { 
        authToken: req.token, 
        payload: req.school.payload[0]
    };
    
    const wStatus = await logout('logout', data); 
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message,
    });
});


// logout user from all devices 
schoolRouter.get('/logoutAll', auth, async (req, res) => {
    const data = { payload: req.school.payload[0] };

    const wStatus = await logout('logoutAll', data); 
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message,
    });
});


// request must ship with "Authorization" header having bearer's auth-token
// return profile of the currently logged in school
schoolRouter.get('/profile', auth, async (req, res) => {
    const school = req.school;

    res.status(school.code).send({ 
        status: school.status, 
        message: school.message, 
        payload: school.payload 
    });
});


// retrieves a registered school given schoolId - for backend admin
schoolRouter.get('/:schoolId', async (req, res) => {
    const schoolId = req.params.schoolId;
    const school = await schoolController.retrieveSchool(schoolId);

    res.status(school.code).send({ 
        status: school.status, 
        message: school.message, 
        payload: school.payload 
    });
});


// retrieves all registered schools - for backend admin
schoolRouter.get('/', async (req, res) => {
    const schools = await schoolController.retrieveAllSchools();
    
    res.status(schools.code).send({ 
        status: schools.status, 
        message: schools.message, 
        payload: schools.payload 
    });
});


// update school profile
schoolRouter.patch('/', async (req, res) => {
    const schoolUpdate = req.body;
    const uStatus = await schoolController.updateSchool(schoolUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});


// delete school profile
schoolRouter.delete('/:schoolId', async (req, res) => {
    const schoolId = req.params.schoolId;
    const dStatus = await schoolController.removeSchool(schoolId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});


/** 
 * @param {*} logoutType logoutType: "logout" or "logoutAll"
 * @param {*} data { authToken, payload } // payload = req.school.payload[0], const authToken = req.token; 
 * @returns 
 */

const logout = async (logoutType, data) => {
    if (!data.payload) {
        return { code: 400, status: 'failed', message: 'Sorry you are not logged in.' };
    }

    let wStatus;
    
    if (logoutType === 'logout') {
        wStatus = await schoolController.performLogOut({ authToken: data.authToken });
    } else {
        wStatus = await schoolController.performLogOutAll({ schId: data.payload.sch_id });
    }

    if (wStatus.status === 'success') {
        wStatus.message = 'You are logged out';    
    } else {
        wStatus.message = 'You are not logged in'; 
    }

    return wStatus;
};


module.exports = schoolRouter;