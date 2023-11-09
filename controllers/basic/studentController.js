const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const generateStudentId = require('../../utils/idGenerationService').generateNextId;
const getClientId = require('../../utils/admin/tokenService').getClientId;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'students';
const itemToBeFetched = 'student';

const writeStudent = async (studentData) => {
    const schlTableName = 'schools';
    const targetField = 'last_student_no';
    const targetFieldAcronym = 'name_acronym';
    const apiKey = studentData.apiKey;
    const sessYear = studentData.sessYear; // to be provided in a UI drop-down box whose entries are fetched from the "Sessions" table
    const termId = studentData.termId;     // to be provided in a UI drop-down box whose entries are fetched from the "Sessions" table
    
    const clientId = getClientId(apiKey); // api token ships with each request
    const schlAcronymObject= await performRead(schlTableName, 'school acronym', { client_id: clientId }, [targetFieldAcronym]);  
    const schlAcronym = schlAcronymObject.payload[0].name_acronym;
    const schlData = { schlAcronym, sessYear, termId };
    const studentId = await generateStudentId(targetField, clientId, schlData);

    const student = { 
        student_id: studentId, 
        first_name: studentData.firstName, 
        middle_name: studentData.middleName, 
        last_name: studentData.lastName, 
        dob: studentData.dob, 
        genotype: studentData.genotype,
        blood_group: studentData.bloodGroup,
        photo_url: studentData.photoUrl,
        address_id: studentData.addressId, 
        date_of_first_resumpt: studentData.dateOfFirstResumption, 
        expected_grad_date: studentData.expectedGradDate, 
        status: studentData.status, 
        class_id: studentData.classId,
        teacher_id: studentData.teacherId, 
        minder_id: studentData.minderId, 
        parent_id: studentData.parentId 
    };  
    
    const writeStatus = await performWrite(tableName, student, 'student');

    if (writeStatus.code === 201) {
        writeStatus.newStudentId = studentId;
    }
    
    return writeStatus;
};

const retrieveStudent = async (studentId) => {
    const student = await performRead(tableName, itemToBeFetched, { student_id: studentId })
    return student;
};

const retrieveAllStudents = async () => {
    const fieldsToSelect = [
        'student_id', 'first_name', 'middle_name', 
        'last_name', 'dob', 'genotype', 'blood_group',
        'photo_url', 'address_id','date_of_first_resumpt', 
        'expected_grad_date', 'status', 'class_id', 'teacher_id', 
        'minder_id', 'parent_id'
    ];
    
    const students = await performReadAll(tableName, 'students',  fieldsToSelect);

    return students;
};

const removeStudent = async (studentId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { student_id: studentId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateStudent = async (termToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { student_id: termToUpdate.studentId };

    const updateStatus = await performUpdate(tableName, itemName, termToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = { 
    writeStudent,
    retrieveStudent,
    retrieveAllStudents,
    removeStudent,
    updateStudent,
};