const dbActions = require('./dbOperations-one');
const toCamelCase = require('./genUtils').toCamelCase;

/**
 * @param clientId: 
 * @param targetField: the field to be fetched from the table. Possible values: last_student_no, last_employee_no, last_parent_no 
 * @param schlData: an object { clientId, schlAcronym, sessYear, termId }
 */
const generateId = async (clientId, targetField, schlData) => { 
    let itemToUpdate;
    let nextStudentId;
    let nextStudentNo;
    const itemName = 'school';
    const tableName = 'schools';
    const queryCriteria = { client_id: clientId };
    const fieldsToSelect = [targetField];
    const tempObj = await dbActions.performRead(tableName, 'school', queryCriteria, fieldsToSelect);
    const prevStudentId = tempObj.payload[0].last_student_no;

    if (prevStudentId) {
        schlData.prevStudentId = prevStudentId;
        nextStudentId = getNextId(targetField, schlData); // NLF202011001
        nextStudentNo = +(nextStudentId.substr(nextStudentId.length - 4)); // 1001
        const adjustedTargetField = toCamelCase(targetField);
        itemToUpdate = { [adjustedTargetField]: nextStudentNo };

        itemToUpdate = { lastStudentNo: nextStudentNo };
        dbActions.performUpdate(tableName, itemName, itemToUpdate, queryCriteria);
    } else {
        let isNewId = true;
        nextStudentId = createNewId(); // review 
        nextStudentNo = +(nextStudentId.substr(nextStudentId.length - 4)); // 1001
        itemToUpdate = { [targetField]: nextStudentNo };
        dbActions.performUpdate(tableName, itemName, itemToUpdate, queryCriteria);
    }

    return nextStudentId
};

/**
 * 
 * @param {*} targetField 
 * @param {*} data: an object {schlAcronym: '...', currSessYear: '...', currSchTerm: '....'}
 * @returns 
 */
const getNextId = (targetField, schlData) => { 
    let nextId;

    switch(targetField) {
        case 'last_student_no':
            nextId = createStudentId(schlData); 
            break;
        case 'last_employee_no': 
            nextId = createEmployeeId();
            break;
        case 'last_parent_no':
            nextId = createParentId();
            break;
    }

    return nextId;
}

/**
 * 
 * @param schlData in format { schlAcronym, sessYear, termId, prevStudentId } 
 * prevStudentId - 4-digit number (e.g., in studentId NLS202310001, student number is 0001); it's the basis on which next id is generated 
 * @returns complete student id in format "NLS202310001" - NLS:3-letter word School Acronyms, 2023:current school year, 1:term, 0001:4-digit representing unique student number 
 */
const createStudentId = (schlData) => {  
     let nextStudentId;

    const initStudentNo = '0001';
    const { schlAcronym, sessYear, termId, prevStudentId } = schlData;
    const adjustedYear = getLowerBoundYear(sessYear); 

    const partialStudentId = schlAcronym + adjustedYear.toString() + termId.toString();

    if (prevStudentId) {
        let temp = Number.parseInt(prevStudentId);
        const adjustedStudentNo = ++temp;
        const nextStudentNo = adjustedStudentNo.toString().padStart(4, '0');
        nextStudentId = partialStudentId + nextStudentNo;
    } else {
        nextStudentId = partialStudentId + initStudentNo;
    }

    return nextStudentId;
};

/**
 * 
 * @param sessYear: should always be in format yyyy-yyyy e.g., 2022-2023 
 * @returns '2022', given the above example 
 */
const getLowerBoundYear = (sessYear) => {
    return sessYear.split('-')[0];
};

const createEmployeeId = () => {

};

const createParentId = () => {

};

module.exports = {
    generateId
}


