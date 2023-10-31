const dbActions = require('./dbOperations-one');

/**
 * 
 * @param schoolId: key used to fetch 
 * @param idToGenerate: the field to be fetched from the table // possible values: last_student_no, last_employee_no, last_parent_no 
 */
const generateId = (schoolId, idToGenerate) => {
    let itemToUpdate;
    const itemName = 'school';
    const tableName = 'schools';
    const queryCriteria = { sch_id: schoolId };
    const fieldsToSelect = [idToGenerate];
    const existId = dbActions.performRead(tableName, 'school', queryCriteria, fieldsToSelect);

    if (existId) {
        const nextId = getNextId(existId, idToGenerate);
        itemToUpdate = { [idToGenerate]: nextId };
        dbActions.performUpdate(tableName, itemName, itemToUpdate, queryCriteria);
    } else {
        let isNewId = true;
        const newId = createNewId();
        itemToUpdate = { [idToGenerate]: newId };
        dbActions.performUpdate(tableName, itemName, itemToUpdate, queryCriteria);
    }
};

const getNextId = (existId, idToGenerate) => {
    let nextId;

    switch(idToGenerate) {
        case 'last_student_no':
            nextId = createStudentId(newId, existId);
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
 * @param schlAcronym: three-letter acronym representing school name
 * @param currSessYear: year of current school session (e.g., 20)  
 * @param currentTerm: current school term, must be obtained from the db table "term"; values: 1 - first, 2 - second term, 3 - third term  
 * @param lastStudentNo: 4-digit number (e.g., in studentId NLS202310001, student number is 0001)  
 * @param isNewId: true - "existId" is null, false - "existId" has value  
 * @param existId: refers to id on the basis of which next id is generated 
 */
const createStudentId = (schlAcronym, currSessYear, currSchTerm, lastStudentNo, isNewId = false) => {
    const initStudentNo = '0001';
    let nextStudentId;

    // "studentId": "NLS202310001" - NLS:3-letter word School Acronyms, 2023:current school year, 1:term, 0001:4-digit representing unique student number 
    if (!isNewId) {
        let temp = Number.parseInt(lastStudentNo);
        const adjustedStudentNo = ++temp;
        const nextStudentNo = padStudentNo(adjustedStudentNo, lastStudentNo); 
        
        nextStudentId = schlAcronym + currSessYear.toString() + currSchTerm.toString() + nextStudentNo.toString();
        console.log('Next-Student-Id: ', nextStudentId);
    } else {
        nextStudentId = schlAcronym + currSessYear.toString() + currSchTerm.toString() + initStudentNo;
        console.log('Initial-Student-Id: ', nextStudentId);
    }
};

const createEmployeeId = () => {

};

const createParentId = () => {

};

const padStudentNo = (adjustedStudentNo, studentNo) => {
    let nextStudentNo;
    const zeroCount = countCharacter(studentNo, '0');

    if (zeroCount === 3) {
        nextStudentNo = adjustedStudentNo.toString().padStart(4, '0'); 
    } else if (zeroCount === 2) {
        nextStudentNo = adjustedStudentNo.toString().padStart(3, '0');
    } else {
        nextStudentNo = adjustedStudentNo.toString().padStart(2, '0');   
    }
    return nextStudentNo;
};

const countCharacter = (item, characterToCount) => {
    let zeroCount = 0;

    for(i = 0; i < item.length; i++) {
        if (item.charAt(i) === characterToCount) {
            ++zeroCount;
        }
    }
    return zeroCount;
};

//createStudentId = (schlAcronym, currSessYear, currSchTerm, lastStudentNo, isNewId = false)
// stdId = createStudentId('NFL', 2023, 1, null, true);
// stdId = createStudentId('NFL', 2023, 1, '0001');
// //stdId = createStudentId('NFL', 2023, 1, '0002');
// stdId = createStudentId('NFL', 2023, 1, '0003');
// //stdId = createStudentId('NFL', 2023, 1, '0004');
// stdId = createStudentId('NFL', 2023, 1, '0005');
