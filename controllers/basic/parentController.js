const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');
const getClientId = require('../../utils/admin/tokenService').getClientId;
const generateEmployeeId = require('../../utils/idGenerationService').generateNextId;


const tableName = 'parents';
const itemToBeFetched = 'parent';

const writeParent = async (parentData) => {
    const targetField = 'last_parent_no';
    const apiKey = parentData.apiKey;
    const clientId = getClientId(apiKey);
    const parentId = await generateEmployeeId(targetField, clientId);

    const parent = { 
        parent_id: parentId, 
        first_name: parentData.firstName, 
        last_name: parentData.lastName, 
        phone: parentData.phone, 
        email: parentData.email,
        photo_url: parentData.photoUrl
    };  
    
    const writeStatus = await performWrite(tableName, parent, 'parent');
    
    if (writeStatus.code === 201) {
        writeStatus.parentId = parentId;
    }

    return writeStatus;
};

const retrieveParent = async (parentId) => {
    const parent = await performRead(tableName, itemToBeFetched, { parent_id: parentId })
    return parent;
};

const retrieveAllParents = async () => {
    const fieldsToSelect = [
        'parent_id', 'first_name', 'last_name', 
        'phone', 'email', 'photo_url'
    ];
    
    const parents = await performReadAll(tableName, 'parents',  fieldsToSelect);

    return parents;
};

const removeParent = async (parentId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { parent_id: parentId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateParent = async (parentToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { parent_id: parentToUpdate.parentId };

    const updateStatus = await performUpdate(tableName, itemName, parentToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = { 
    writeParent,
    retrieveParent,
    retrieveAllParents,
    removeParent,
    updateParent,
};