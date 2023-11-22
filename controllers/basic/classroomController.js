const { mysqlConn } = require('../../utils/dbConnection');
const generateClassroomId = require('../../utils/idGenerationService').generateNextId;
//const generateClassroomId = require('../../utils/idGenerationService').generateNextId;
const getClientId = require('../../utils/admin/tokenService').getClientId;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');



const tableName = 'classrooms';
const itemToBeFetched = 'classroom';

const writeSchlClassroom = async (classroom) => {
    const targetField = 'last_classroom_no';
    const apiKey = classroom.apiKey;
    const clientId = getClientId(apiKey);

    let classId = await generateClassroomId(targetField, clientId);

    const classroomData = { class_id: classId, class_name: classroom.className, purpose: classroom.purpose, period_of_use: classroom.periodOfUse };  
    const writeStatus = await performWrite(tableName, classroomData, 'classroom');

    if (writeStatus.code === 201) {
        writeStatus.classId = classId;
    }

    return writeStatus;
};

const retrieveSchlClassroom = async (classId) => {
    const fieldsToSelect = ['class_id', 'class_name', 'purpose', 'period_of_use'];
    const classroomData = await performRead(tableName, itemToBeFetched, { class_id: classId }, fieldsToSelect);
    
    return classroomData;
};

const retrieveAllSchlClassrooms = async () => {
    const fieldsToSelect = ['class_id', 'class_name', 'purpose', 'period_of_use'];
    const classroomData = await performReadAll(tableName, 'classrooms',  fieldsToSelect);

    return classroomData;
};

const removeSchlClassroom = async (classId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { class_id: classId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchlClassroom = async (classroomToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { class_id: classroomToUpdate.classId };

    const updateStatus = await performUpdate(tableName, itemName, classroomToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = {
    writeSchlClassroom,
    retrieveSchlClassroom,
    retrieveAllSchlClassrooms,
    removeSchlClassroom,
    updateSchlClassroom,
};