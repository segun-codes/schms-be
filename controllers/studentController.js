const mysqlConn = require('../utils/dbConnection').mysqlConn;
const studentSchema = require('../model/studentSchema').studentSchema;
const convertToSnakeCase = require('../utils/genUtils').convertToSnakeCase;

const writeStudent = async (firstName, lastName) => {
    await setUpSchema();

    try {
        const insertedRows = await mysqlConn('students').insert({ first_name: firstName, last_name: lastName });
        console.log('Insertion completed successfully');
        return insertedRows;
    } catch(err) {
        console.log('Insert operation failed');
    }
};

const retrieveStudent = async (id) => {
    await setUpSchema();

    try {
        const retrievalCount = await mysqlConn.select('student_id', 'first_name', 'last_name').from('students');
        console.log('Retrieval completed successfully');
        return retrievalCount;
    } catch(e) {
        console.log('Retrieving student failed');
    }
};

const deleteStudent = async (studentId) => {
    await setUpSchema();

    try {
        const deleteCount = await mysqlConn('students').where('student_id', studentId).del();
        
        if (deleteCount) 
            console.log(`Student with id ${studentId} deleted from db`);

        return deleteCount;
    } catch (err) {
        console.log('Deleting student failed');
    }
};

const updateStudent = async (studentUpdate) => {
    let updateObject = {};
    const studentPropertySet = ['firstName', 'lastName']; 

    await setUpSchema();

    // construct "updateObject" passed to "update()"
    for (const property of studentPropertySet) {
        if (Object.hasOwn(studentUpdate, property)) {
            const propertyNeedUpdate = property; // for readability
            const snakeCasedProperty = convertToSnakeCase(propertyNeedUpdate);
            updateObject[snakeCasedProperty] = studentUpdate[propertyNeedUpdate];
        };
    }

    if (updateObject) {
        try {
            const updatedRow = await mysqlConn('students')
                .where({student_id: studentUpdate.studentId}) 
                .update(updateObject);
            console.log('Update completed');
            
            return updatedRow;
        } catch(err) {
            console.log('Updating student failed');
        }
    }

    
};

const setUpSchema = async () => {
    try {
        await studentSchema(); 
    } catch(err) {
        console.log('Schema setup failed');
    }
};


module.exports = {
    setUpSchema,  
    writeStudent,
    retrieveStudent,
    deleteStudent,
    updateStudent,
};