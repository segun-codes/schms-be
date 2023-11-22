const { mysqlConn } = require('../../utils/dbConnection');
const generateCurriculumId = require('../../utils/idGenerationService').generateNextId;
const getClientId = require('../../utils/admin/tokenService').getClientId;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');




const tableName = 'curricula';
const itemToBeFetched = 'curriculum';
const fieldsToSelect = ['curriculum_id', 'week_no', 'topic', 'objective', 'details', 'comment'];

const writeSchlCurriculum = async (curriculum) => {
    const targetField = 'last_curriculum_no';
    const apiKey = curriculum.apiKey;
    const clientId = getClientId(apiKey);
    const curriculumId = await generateCurriculumId(targetField, clientId);

    const curriculumData = { 
        curriculum_id: curriculumId, 
        week_no: curriculum.weekNo, 
        topic: curriculum.topic, 
        objective: curriculum.objective, 
        details: curriculum.details, 
        comment: curriculum.comment 
    };  
    const writeStatus = await performWrite(tableName, curriculumData, 'curriculum');

    if (writeStatus.code === 201) {
        writeStatus.curriculumId = curriculumId;
    }

    return writeStatus;
};

const retrieveSchlCurriculum = async (curriculumId) => {
    const curriculumData = await performRead(tableName, itemToBeFetched, { curriculum_id: curriculumId }, fieldsToSelect);
    
    return curriculumData;
};

const retrieveAllSchlCurricula = async () => {
    const curriculumData = await performReadAll(tableName, 'curricula',  fieldsToSelect);

    return curriculumData;
};

const removeSchlCurriculum = async (curriculumId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { curriculum_id: curriculumId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchlCurriculum = async (curriculumToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { curriculum_id: curriculumToUpdate.curriculumId };

    const updateStatus = await performUpdate(tableName, itemName, curriculumToUpdate, queryCriteria);

    return updateStatus;
};

module.exports = {
    writeSchlCurriculum,
    retrieveSchlCurriculum,
    retrieveAllSchlCurricula,
    removeSchlCurriculum,
    updateSchlCurriculum,
};