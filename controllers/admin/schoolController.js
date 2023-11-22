const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'schools';
const itemToBeFetched = 'school';

const writeSchool = async (school) => {
    const schoolData = { 
        name: school.name, 
        name_acronym: school.nameAcronym, 
        type: school.type, 
        address: school.address, 
        last_student_no: school.lastStudentNo, 
        last_employee_no: school.lastEmployeeNo, 
        last_parent_no: school.lastParentNo, 
        last_address_no: school.lastAddressNo,
        last_classroom_no: school.classroomNo,        // place value 0 - 000 (e.g., 0, 00, 000)
        // last_curriculum_no: school.curriculumNo,
        // last_session_year: school.sessionYear,      // in format YYYY-YYYY (e.g., 2020-2021)
        // last_subject_no: school.subjectNo,
        // last_term_no: school.termNo,
        client_id: school.clientId
    };  
    
    const writeStatus = await performWrite(tableName, schoolData, 'school');

    return writeStatus;
};

const retrieveSchool = async (schoolId) => {
    const fieldsToSelect = ['sch_id', 'name', 'type', 'address'];
    const schoolData = await performRead(tableName, itemToBeFetched, { sch_id: schoolId }, fieldsToSelect);
    
    return schoolData;
};

const retrieveAllSchools = async () => {
    const fieldsToSelect = ['sch_id', 'name', 'type', 'address'];
    const schoolData = await performReadAll(tableName, 'school',  fieldsToSelect);

    return schoolData;
};

const removeSchool = async (schoolId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { sch_id: schoolId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateSchool = async (schoolToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { sch_id: schoolToUpdate.schoolId };

    const updateStatus = await performUpdate(tableName, itemName, schoolToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = {
    writeSchool,
    retrieveSchool,
    retrieveAllSchools,
    removeSchool,
    updateSchool,
};