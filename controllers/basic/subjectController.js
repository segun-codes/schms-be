const { mysqlConn } = require('../../utils/dbConnection');
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');



const tableName = 'subjects';
const itemToBeFetched = 'subject';
const fieldsToSelect = ['subject_id', 'curriculum_id', 'name', 'description', 'objective', 'level'];

const writeSchlSubject = async (subject) => {
    const subjectData = { 
        subject_id: subject.subjectId, 
        curriculum_id: subject.curriculumId, 
        name: subject.name, 
        description: subject.description, 
        objective: subject.objective, 
        level: subject.level 
    };  
    const writeStatus = await performWrite(tableName, subjectData, 'subject');

    return writeStatus;
};

const retrieveSchlSubject = async (subjectId) => {
    const subjectData = await performRead(tableName, itemToBeFetched, { subject_id: subjectId }, fieldsToSelect);
    
    return subjectData;
};

const retrieveAllSchlSubjects = async () => {
    const subjectData = await performReadAll(tableName, 'subjects',  fieldsToSelect);

    return subjectData;
};

const removeSchlSubject = async (subjectId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { subject_id: subjectId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchlSubject = async (subjectToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { subject_id: subjectToUpdate.subjectId };

    const updateStatus = await performUpdate(tableName, itemName, subjectToUpdate, queryCriteria);

    return updateStatus;
};

// const updateSchlTerm = async (termToUpdate) => {
//     const itemName = itemToBeFetched;
//     const queryCriteria = { term_id: termToUpdate.termId };

//     const updateStatus = await performUpdate(tableName, itemName, termToUpdate, queryCriteria);

//     return updateStatus;
// };

module.exports = {
    writeSchlSubject,
    retrieveSchlSubject,
    retrieveAllSchlSubjects,
    removeSchlSubject,
    updateSchlSubject,
};