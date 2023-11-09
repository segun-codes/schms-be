const dbActions = require('./dbOperations-one');
const toCamelCase = require('./genUtils').toCamelCase;


/**
 * @param targetField: fields such as last_student_no, last_employee_no etc all found in table "schools"
 * @param clientId: id that identifies each school registered on table "schools"
 * @param schlData: an object { clientId, schlAcronym, sessYear, termId }. Only required if studentId is to be generated. 
 */
const generateNextId = async (targetField, clientId, schlData = null) => { 
    let nextId;
    let itemToUpdate;
    let nextStudentNo;
    
    const tableName = 'schools';
    const message = 'school';
    const queryCriteria = { client_id: clientId };
    const fieldsToSelect = [targetField];
    const tempObj = await dbActions.performRead(tableName, message, queryCriteria, fieldsToSelect);
    let prevNo = extractPrevIdNumber(targetField, tempObj); 
      
    if (schlData) {
        schlData.prevStudentNo = prevNo;
        const nextStudentId = createStudentId(schlData); // NLF202011001
        nextStudentNo = ++prevNo;
        itemToUpdate = { lastStudentNo: nextStudentNo };
        nextId = nextStudentId;
    } else {
        const fieldToUpdate = toCamelCase(targetField);
        nextId = ++prevNo; 
        itemToUpdate = { [fieldToUpdate]: nextId };
    }

    dbActions.performUpdate(tableName, message, itemToUpdate, queryCriteria);

    return nextId;
};

/**
 * 
 * @param {*} targetField: must be one of last_student_no, last_employee_no etc.
 * @param {*} tempObj: lightweight object, used to access the desired targetField 
 * @returns 
 */
const extractPrevIdNumber = (targetField, tempObj) => {
    let prevId;

    switch(targetField) {
        case 'last_student_no':
            prevId = tempObj.payload[0].last_student_no;
            break;
        case 'last_employee_no':
            prevId = tempObj.payload[0].last_employee_no;
            break;
        case 'last_parent_no':
            prevId = tempObj.payload[0].last_parent_no;
            break;
        case 'last_address_no':
            prevId = tempObj.payload[0].last_address_no;
            break;
    }

    return prevId; 
}

/**
 * Generate studentId in alphanumeric format
 * @param schlData: in format { schlAcronym, sessYear, termId, prevStudentNo }, prevStudentNo is a 4-digit number 
 * @returns complete student id in format "NLS202310001" - NLS:3-letter word School Acronyms, 2023:current school year, 1:term, 0001:4-digit representing unique student number 
 */
const createStudentId = (schlData) => {  
     let nextStudentId;

    const initStudentNo = '0001';
    const { schlAcronym, sessYear, termId, prevStudentNo } = schlData;
    const adjustedYear = getLowerBoundYear(sessYear); 
    const partialStudentId = schlAcronym + adjustedYear.toString() + termId.toString();

    if (prevStudentNo) {
        let temp = Number.parseInt(prevStudentNo);
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
    console.log('sessYear: ', sessYear);
    
    return sessYear.split('-')[0];
};



module.exports = {
    generateNextId
    // generateStudentId,
    // generateEmployeeId
}


