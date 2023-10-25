const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'academic_sessions';
const itemToBeFetched = 'school session';

const writeSchlSession = async (schlSess) => {
    const schlSessObj = { session_name: schlSess.sessionName, session_year: schlSess.sessionYear, comment: schlSess.comment };  
    const schlSessData = await performWrite(tableName, schlSessObj, 'school session');
    
    return { 
        code: schlSessData.code, 
        status: schlSessData.status,
        message: schlSessData.message 
    };
};

const retrieveSchlSession = async (schlSessYear) => {
    const termData = await performRead(tableName, itemToBeFetched, { session_year: schlSessYear });

    return {
        code: termData.code,
        status: termData.status,
        message: termData.message,
        payload: termData.payload
    };
};

const retrieveAllSchlSessions = async () => {
    const fieldsToSelect = ['id', 'session_name', 'session_year', 'comment'];
    const termData = await performReadAll(tableName, 'school sessions',  fieldsToSelect);

    return termData;
};

const removeSchlSession = async (schlSessYear) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { session_year: schlSessYear };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchlSession = async (termToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { session_year: termToUpdate.sessionYear };

    const updateStatus = await performUpdate(tableName, itemName, termToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = { 
    writeSchlSession,
    retrieveSchlSession,
    retrieveAllSchlSessions,
    removeSchlSession,
    updateSchlSession
};