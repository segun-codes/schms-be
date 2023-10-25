const { mysqlConn } = require('../../utils/dbConnection');
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');



const tableName = 'school_terms';
const itemToBeFetched = 'term';

const writeSchTerm = async (schlTerm) => {
    const termData = { term_id: schlTerm.termId, term: schlTerm.term, session_year: schlTerm.sessionYear, comment: schlTerm.comment };  
    const writeStatus = await performWrite(tableName, termData, 'term');

    return writeStatus;
};

const retrieveSchlTerm = async (termId) => {
    const fieldsToSelect = ['term_id', 'term', 'session_year', 'comment'];
    const termData = await performRead(tableName, itemToBeFetched, { term_id: termId }, fieldsToSelect);
    
    return termData;
};

const retrieveAllSchlTerms = async () => {
    const fieldsToSelect = ['term_id', 'term', 'session_year', 'comment'];
    const termData = await performReadAll(tableName, 'terms',  fieldsToSelect);

    return termData;
};

const removeSchlTerm = async (termId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { term_id: termId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchlTerm = async (termToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { term_id: termToUpdate.termId };

    const updateStatus = await performUpdate(tableName, itemName, termToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = {
    writeSchTerm,
    retrieveSchlTerm,
    retrieveAllSchlTerms,
    removeSchlTerm,
    updateSchlTerm,
};