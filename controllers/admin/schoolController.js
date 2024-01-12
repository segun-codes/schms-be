    // include node fs module
const fs = require('fs');

const renameFile = require('../../utils/genUtils').renameFile;
const validatePassword = require('../../utils/genUtils').validatePassword;
const generateJWToken = require('../../utils/idGenerationService').generateJWToken;
const encryptPassword = require('../../utils/genUtils').encryptPassword;
const sendFileToGoogleDrive = require('../../utils/genUtils').sendFileToGoogleDrive;
const getFileFromGoogleDrive = require('../../utils/genUtils').getFileFromGoogleDrive


const { 
    performWrite, 
    performRead, 
    performReadAll, 
    performDelete, 
    performDeleteAll,
    performUpdate, 
    retrieveTwoTableFromDb,
    countEntries
} = require('../../utils/dbOperations-one');



const tableName = 'schools';
const itemToBeFetched = 'school';


const writeSchool = async (school) => {
    const encryptedPass = await encryptPassword(school.password);

    const schoolData = { 
        name: school.name, 
        name_acronym: school.nameAcronym, 
        type: school.type, 
        address: school.address,
        
        username: school.username,
        password: encryptedPass,
        phone_no_1: school.phoneNo1,
        phone_no_2: school.phoneNo2,
        email: school.email,

        last_student_no: school.lastStudentNo, 
        last_employee_no: school.lastEmployeeNo, 
        last_parent_no: school.lastParentNo, 
        last_address_no: school.lastAddressNo,
        last_classroom_no: school.classroomNo,        // place value 0 - 000 (e.g., 0, 00, 000)
        // last_curriculum_no: school.curriculumNo,
        // last_session_year: school.sessionYear,      // in format YYYY-YYYY (e.g., 2020-2021)
        // last_subject_no: school.subjectNo,
        // last_term_no: school.termNo,
        client_id: school.clientId,
        profile_pix: school.profilePix
    };  
    
    const writeStatus = await performWrite(tableName, schoolData, 'school');
    const duplicateEntryMessage = 'school already exist, duplicate entry prevented!';

    if (writeStatus.message === duplicateEntryMessage) {
        return { code: 400, status: 'failed', message: 'user already exist' };
    }

    const schId = writeStatus.schId;
    const authToken = generateJWToken(schId);

    if (schId && authToken) {
        await populateSchAuthTable(schId, authToken);
    }

    writeStatus.authToken = authToken;

    return writeStatus;
};

const retrieveSchool = async (schoolId) => {
    const fieldsToSelect = ['sch_id', 'name', 'type', 'address'];
    const schoolData = await performRead(tableName, itemToBeFetched, { sch_id: schoolId }, fieldsToSelect);
    
    return schoolData;
};

const retrieveAllSchools = async () => {
    const fieldsToSelect = ['sch_id', 'name', 'type', 'address'];
    const schoolData = await performReadAll(tableName, 'school',  fieldsToSelect);

    return schoolData;
};

const removeSchool = async (schoolId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { sch_id: schoolId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchool = async (schoolToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { sch_id: schoolToUpdate.schoolId };

    const updateStatus = await performUpdate(tableName, itemName, schoolToUpdate, queryCriteria);

    return updateStatus;
};

const performLogin = async (username, plainTextPassword) => {
    const searchCriteria =  { username };
    const fieldsToSelect1 = ['sch_id', 'password'];
    const output = { code: 400, status: 'failed', message: 'login failed, proceed to sign up' };

    const result1 = await performRead(tableName, itemToBeFetched, searchCriteria, fieldsToSelect1);
    
    if (!result1.payload[0]) {
        return output;
    }
    
    const schId = result1.payload[0].sch_id;
    const hashedPassword = result1.payload[0].password;
    const isPasswordExist = await validatePassword(plainTextPassword, hashedPassword);

    if (!isPasswordExist) {
        output.message = 'username or password incorrect';
        return output;
    }

    const authToken = generateJWToken(schId);
    await populateSchAuthTable(schId, authToken);

    output.code = 200;
    output.status = 'success';
    output.message = 'you are now logged in';
    output.authToken = authToken;

    return output;
};

const populateSchAuthTable = async (schId, authToken) => {
    const table = 'schoolAuths'; //performWrite = async (tableName, itemData, itemName)

    const popStatus = await performWrite(
        table, 
        { sch_id: schId, auth_token: authToken }, 
        'schoolAuths-mapping' 
    );
};


//data is either { schId: 'xxx' } or {authToken: 'xxx'} but not  { schId: 'xxx', authToken: 'xxx' }  
const performLogOut = async (data) => {
    let itemToDelete;
    let queryCriteria;
    const tableName = 'schoolAuths';

    if (data.schId) {
        itemToDelete = 'rows of schoolAuths';
        queryCriteria = { sch_id: data.schId };
    } else {
        itemToDelete = 'schoolAuths';
        queryCriteria = { auth_token: data.authToken };
    }

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};


const performLogOutAll = async (data) => {
    return await performLogOut(data);
};


const renameUploadedFile = (uploadedFile) => {
    try {
        const renamedFile = renameFile(uploadedFile);
        return renamedFile;
    } catch(e) {
        console.log('Error: ', e.message);
    }
};


const sendFileToGoogleCloudDrive = (fileDetails) => {
    const googleDriveFileId = sendFileToGoogleDrive(fileDetails); 
};

const downloadFileFromGoogleDrive = (fileId) => {
    getFileFromGoogleDrive(fileId);
};



module.exports = {
    writeSchool,
    retrieveSchool,
    retrieveAllSchools,
    removeSchool,
    updateSchool,
    performLogin,
    performLogOut,
    performLogOutAll,
    renameUploadedFile,
    sendFileToGoogleCloudDrive,
    downloadFileFromGoogleDrive
};