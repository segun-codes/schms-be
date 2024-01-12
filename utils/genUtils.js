const fs = require('fs');
const stream = require('node:stream');
const path = require('node:path'); 
const bcrypt = require('bcrypt');
const { rename } = require('node:fs'); 
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');


const KEYFILEPATH = path.join(__dirname, '/../google-cloud-credentials.json');
const DOWNLOADPATH = path.join(__dirname, '/../download/tmp.jpg')
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES 
});


const sendFileToGoogleDrive = async (fileDetails) => {    
    const folderId = fileDetails.folderId || "13cIgXAewxtbLItnq4Eyhp73WW_8X8pQB";   // use parent folder on google drive if specific folder isn't provided

    try {
        const { data } = await google.drive({ version: 'v3', auth }).files.create({
            resource: {
                name: fileDetails.fileName,
                parents: [folderId]
            },
            media: {
                mimeType: fileDetails.mimetype,
                body: fs.createReadStream(path.join(__dirname, `/../uploads/school-profile-pix/${fileDetails.fileName}`))
            },
            fields: 'id, name',
        });
    
        console.log(`Uploaded file: ${data.name} ${data.id}`);
        return data.id;

    } catch (err) {
        console.log('file upload failed')
        throw err;
    }
};

const getFileFromGoogleDrive = async (fileId) => {
    const service = google.drive({version: 'v3', auth});
    const dest = fs.createWriteStream(DOWNLOADPATH, { flags: 'w'});

    try {
        const fileStream = await service.files.get({ fileId, alt: 'media' },  { responseType: 'stream' } );
        fileStream.data.pipe(dest);
        
        return fileStream.status;
    } catch(err) {
        console.log('An error occurred');
        throw err;
    }
};


const renameFile = (uploadedFile) => {
    let tempPath;
    let newFilePath;

    const oldFilePath = uploadedFile.path;
    const originalName = uploadedFile.originalname;
    let indexWin = oldFilePath.lastIndexOf('\\');
    let indexUnix = oldFilePath.lastIndexOf('/');

    // construct the new path, it includes the actual desired file name
    if (indexWin) {
      tempPath  = oldFilePath.substring(0, (indexWin + 1));
      newFilePath = tempPath.concat('', originalName);
    } else if (indexUnix) {
        tempPath  = oldFilePath.substring(0, (indexUnix + 1));
        newFilePath = tempPath.concat('', originalName);
    }

    rename(oldFilePath, newFilePath, (err) => {
        if (err) throw err;
`       console.log('Rename complete!');`
    });

    return {
        fileName: originalName,
        noFileNamePath: tempPath,  
        filePath: newFilePath,
        fileSize: uploadedFile.size,
    };
};


const encryptPassword = async (plainTextPassword) => {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    return hashedPassword;
};


const validatePassword = async (plainTextPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    
    return match;
};


// convert firstName to first_name
const convertToSnakeCase = (property) => {    
    //g => sticky flag, tells "replace()" to replace more than once
    const snakeCasedProperty = property.replace(/[A-Z]/g, (letter) => { return '_' + letter.toLowerCase() });  

    return snakeCasedProperty;
};


// transforms word in snake case to camel case format
const toCamelCase = (property) => {
    let temp;
    let propertyInCamelCase = '';
    let capitalizeNextItem = false;

    for(i = 0; i < property.length; ++i) {
        temp = property.charAt(i);

        if (capitalizeNextItem) {
            propertyInCamelCase += temp.toUpperCase();
            capitalizeNextItem = false;
        } else {
            if (temp === '_')  {
                capitalizeNextItem = true;
            } else {
                propertyInCamelCase += temp;
            }
        }
    }

    return propertyInCamelCase;
};


module.exports = {
    convertToSnakeCase,
    toCamelCase,
    encryptPassword,
    validatePassword,
    renameFile,
    sendFileToGoogleDrive,
    getFileFromGoogleDrive
};