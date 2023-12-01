//let mysqlConn = require('./dbConnection').mysqlConn; // uncomment to use dev db
let mysqlConn = require('./dbConnection').mysqlConnTest; // uncomment to use test db
const setUpSchema = require('../model/model-utils/schemaSetup').setUpSchema;
const convertToSnakeCase = require('../utils/genUtils').convertToSnakeCase;
const errorMessages = require('../config/errorConfig').errorMessages;


const performWrite = async (tableName, itemData, itemName, conn = null) => {
    return await writeToDB(tableName, itemData, itemName, conn);
};

const performRead = async (tableName, itemName, queryCriteria, fieldsToSelect, conn = null) => {
    return await retrieveFromDb(tableName, itemName, queryCriteria, fieldsToSelect, conn);
};

const performReadAll = async (tableName, itemName, fieldsToSelect, conn = null) => {
    return await retrieveAllFromDb(tableName, itemName, fieldsToSelect, conn);
};

const performDelete = async (tableName, itemName, queryCriteria, conn = null) => {
    return await deleteItem(tableName, itemName, queryCriteria, conn);  
};

const performUpdate = async (tableName, itemName, itemToUpdate, queryCriteria, conn = null) => {
    return await updateItem(tableName, itemName, itemToUpdate, queryCriteria, conn);
};

/**
 * Generic function to perform write operation to the db
 * 
 * @param {*} tableName - name of table 
 * @param {*} dataToInsert 
 * @param {*} message - message to be interpolated in error and non-error messages 
 * @returns Object with status update on the write operation
 */
const writeToDB = async (tableName, dataToInsert, message, conn) => { // tableName = 'school_term', message = 'school term', insertEntries = { session_name: schlSess.sessionName, session_year: schlSess.sessionYear, comment: schlSess.comment}
    await setUpSchema(tableName, conn);

    if (conn) {
        mysqlConn = conn;
    }

    try {
        const insRowCount = await mysqlConn(tableName).insert(dataToInsert);
        if (insRowCount) {
            console.log('Insertion completed successfully'); 
            return { code: 201, status: 'success', message: `New ${message} created` };
        }
    } catch(err) {
        console.log('Insertion failed for duplicate entry or other unknown reason!'); 
        console.log('err: ', err);
        if (err.code === errorMessages.DUPLICATE_ENTRY) 
            return { code: 400, status: 'failed', message: `${message} already exist, duplicate entry prevented!` };
    }

    return { code: 400, status: 'failed', message: `${message} not created!` };
};

/**
 * Generic function to fetch one item from db
 * 
 * @param {*} tableName      - name of table 
 * @param {*} queryCriteria  -  expected in the form "{ term: term, session_year: sessionYear }"
 * @param {*} fieldsToSelect - expected in the form "[student_id, first_name]"
 * @param {*} itemName       - name of object (e.g., student, term, school session etc) to be fetched 
 * @returns Object with status update on the write operation
 */

const retrieveFromDb = async (tableName, itemName, queryCriteria, fieldsToSelect = null, conn = null) => {  
    await setUpSchema(tableName, conn);

    if (conn) {
        mysqlConn = conn;
    }
    
    try {
        const retrievedData = await mysqlConn(tableName).where(queryCriteria).select(fieldsToSelect);  

        if (retrievedData.length) {
            console.log('Retrieval completed successfully');
            return { code: 200, status: 'success', message: 'none', payload: retrievedData };
        }
    } catch(err) {
        console.log(`Retrieving ${itemName} failed`);
        console.log('err: ', err);
    }

    return { code: 404, status: 'failed', message: `no ${itemName} data found`, payload: {} }
};

const retrieveAllFromDb = async (tableName, itemName, fieldsToSelect, conn = null) => {
    await setUpSchema(tableName, conn);

    let items = [];

    if (conn) {
        mysqlConn = conn;
    }

    try {
        const retrievedItems = await mysqlConn.select(fieldsToSelect).from(tableName); 

        if (retrievedItems.length) { 
            retrievedItems.map((item) => {
                items.push(item);
            });

            console.log('Retrieval completed successfully');
            return { code: 200, status: 'success', message: 'none', payload: items };
        }
    } catch(e) {
        console.log(`Retrieving ${itemName} failed`);
    }

    return { code: 404, status: 'failed', message: `no ${itemName} data found`, payload: {} };
};

const deleteItem = async (tableName, itemName, queryCriteria, conn = null) => {
    await setUpSchema(tableName, conn);

    if (conn) {
        mysqlConn = conn;
    }

    try {
        const deleteCount = await mysqlConn(tableName).where(queryCriteria).del();
        
        if (deleteCount) {
            console.log(`${itemName} deleted from db`);
            return { code: 200, status: 'success', message: `${itemName} removed` };
        }
    } catch (err) {
        console.log(`Deleting ${itemName} failed`);
        console.log('err: ', err);
    }

    return { code: 404, status: 'failed', message: `${itemName} not found` };    
};

/**
 * 
 * @param {*} tableName 
 * @param {*} itemName 
 * @param {*} itemToUpdate  - refers to field(s) to be updated, in format {term: 'first-term'} or {session_year: '2021-2022'}
 * @param {*} queryCriteria - in format {term_id: 1}
 * @returns 
 */

const updateItem =  async (tableName, itemName, itemToUpdate, queryCriteria, conn = null) => {
    //console.log('queryCriteria: ', queryCriteria);

    let targetPropertySet;
    let updateObject = {}; // used to construct object in format that knexjs requirement

    const schlSessPropertySet = ['sessionName', 'sessionYear', 'comment'];     
    const schlTermPropertySet = ['termId', 'term', 'sessionYear', 'comment'];
    const schlClassroomPropertySet = ['classId', 'className', 'purpose', 'periodOfUse'];
    const subjectPropertySet = ['subjectId', 'curriculumId', 'name', 'description', 'objective', 'level'];
    const schlCurriculumPropertySet = ['curriculumId', 'weekNo', 'topic', 'objective', 'details', 'comment'];
    const addressPropertySet = ['addressId', 'empId', 'studentId', 'houseNo', 'streetLineOne', 'streetLineTwo', 'townCity', 'stateRegion', 'country', 'postCode'];
    const parentPropertySet = ['parentId', 'firstName', 'lastName', 'phone', 'email', 'photoUrl'];
    const schoolPropertySet = [
        'name', 'nameAcronym', 'type', 
        'address', 'lastStudentNo', 'lastEmployeeNo', 
        'lastParentNo', 'lastAddressNo', 'lastClassroomNo', 'clientId',
        'lastCurriculumNo', 
    ];
    const employeePropertySet = [
        'empId', 'firstName', 'middleName', 'lastName', 
        'dob', 'photoUrl',  'employmentDate', 'statusOfEmployment', 
        'role', 'phoneNo', 'email', 'addressId'
    ];
    const studentPropertySet = [
        'studentId', 'firstName', 'middleName', 
        'lastName', 'dob', 'genotype', 'bloodGroup', 
        'photoUrl', 'addressId', 'dateOfFirstResumption', 
        'expectedGradDate', 'status', 'classId', 'teacherId', 'minderId', 'parentId' 
    ];
    
    //console.log('tableName: ', tableName);
    switch(tableName) {
        case 'school_terms': 
            targetPropertySet = schlTermPropertySet;
            break;
        case 'academic_sessions': 
            targetPropertySet = schlSessPropertySet; 
            break;    
        case 'students': 
            targetPropertySet = studentPropertySet;
            break; 
        case 'employees':
            targetPropertySet = employeePropertySet;
            break;
        case 'subjects': 
            targetPropertySet = subjectPropertySet;
            break;
        case 'curricula': 
            targetPropertySet = schlCurriculumPropertySet;
            break;
        case 'classrooms': 
            targetPropertySet = schlClassroomPropertySet;
            break; 
        case 'addresses':  
            targetPropertySet = addressPropertySet;
            break;
        case 'parents':
            targetPropertySet = parentPropertySet;
            break;
        case 'schools':
            targetPropertySet = schoolPropertySet;
            break;
    }

    if (conn) {
        mysqlConn = conn;
    }

    await setUpSchema(tableName, mysqlConn);
    //console.log('itemToUpdate: ', itemToUpdate);
    //console.log('targetPropertySet: ', targetPropertySet);

    // construct "updateObject" passed to be "update()"
    for (const property of targetPropertySet) {
        if (Object.hasOwn(itemToUpdate, property)) { // ensures each property in object "itemToUpdate" are available in propertyset of the object to be updated
            const propertyNeedUpdate = property;     
            const snakeCasedProperty = convertToSnakeCase(propertyNeedUpdate); // converts the property (e.g., studentId) to snake case (e.g., student_id) used to named fields in the db
            updateObject[snakeCasedProperty] = itemToUpdate[propertyNeedUpdate]; // constructs object with field name matching valid db field names (i.e., {student_id: '...'} and not {studentId: '...'})
        };
    }

    if (updateObject) {
        try {
            const updatedRowCount = await mysqlConn(tableName).where(queryCriteria).update(updateObject);

            if (updatedRowCount) {
                //console.log('Update completed');
                return { code: 201, status: 'success', message: `${itemName} updated`};
            }
        } catch(err) {
            console.log('err: ', err);
            console.log(`Updating ${itemName} failed`);
        }
    }

    return { code: 400, status: 'failed', message: `no ${itemName} to update` };
};


module.exports = {
    performWrite,
    performRead,
    performReadAll,
    performDelete,
    performUpdate
};