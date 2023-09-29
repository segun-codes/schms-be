const mysqlConn = require('../utils/dbConnection').mysqlConn;
const studentSchema = require('../model/studentSchema').studentSchema;
const convertToSnakeCase = require('../utils/genUtils').convertToSnakeCase;
const errorMessages = require('../config/errorConfig').errorMessages;

const writeStudent = async (studentId, firstName, lastName) => {
    await setUpSchema();

    try {
        const insRowCount = await mysqlConn('students').insert({ student_id: studentId, first_name: firstName, last_name: lastName });
       
        if (insRowCount) {
            console.log('Insertion completed successfully'); 
            return { code: 201, status: 'success', message: 'student registered' };
        }
    } catch(err) {
        console.log('Insertion failed for duplicate entry or other unknown reason!'); 
        if (err.code === errorMessages.DUPLICATE_ENTRY) 
            return { code: 400, status: 'failed', message: 'Student already exist, duplicate entry prevented!' };
    }

    return { code: 400, status: 'failed', message: 'student not registered!' };
};

const retrieveStudent = async (studentId) => {
    await setUpSchema();

    try {
        const studentProfile = await mysqlConn('students').where({ student_id: studentId }).select('student_id', 'first_name', 'last_name');
        console.log('studentProfile: ', studentProfile);

        if (studentProfile) {
            console.log('Retrieval completed successfully');
            return { code: 200, status: 'success', message: 'none', payload: studentProfile };
        }
    } catch(err) {
        console.log('Retrieving student failed');
        console.log('err: ', err);
    }

    return { code: 404, status: 'failed', message: 'no student data found', payload: {} }
};

const retrieveAllStudents = async () => {
    await setUpSchema();

    let studentData = [];

    try {
        const studentProfiles = await mysqlConn.select('student_id', 'first_name', 'last_name').from('students');

        if (studentProfiles.length) {
            studentProfiles.map((item) => {
                studentData.push(item);
            });

            console.log('Retrieval completed successfully');
            return { code: 200, status: 'success', message: 'none', payload: studentData };
        }
    } catch(e) {
        console.log('Retrieving student failed');
    }

    return { code: 200, status: 'failed', message: 'no student data found', payload: {} };
};

const deleteStudent = async (studentId) => {
    await setUpSchema();

    try {
        const deleteCount = await mysqlConn('students').where('student_id', studentId).del();
        
        if (deleteCount) {
            console.log(`Student with id ${studentId} deleted from db`);
            return { code: 200, status: 'success', message: 'student removed' };
        }
    } catch (err) {
        console.log('Deleting student failed');
        console.log('err: ', err);
    }

    return { code: 400, status: 'failed', message: 'student not found' };
};

const updateStudent = async (studentUpdate) => {
    let updateObject = {};
    const studentPropertySet = ['student_id', 'firstName', 'lastName']; 

    await setUpSchema();

    // construct "updateObject" passed to be "update()"
    for (const property of studentPropertySet) {
        if (Object.hasOwn(studentUpdate, property)) {
            const propertyNeedUpdate = property; 
            const snakeCasedProperty = convertToSnakeCase(propertyNeedUpdate); // 
            updateObject[snakeCasedProperty] = studentUpdate[propertyNeedUpdate];
        };
    }

    if (updateObject) {
        try {
            const updatedRowCount = await mysqlConn('students')
                .where({student_id: studentUpdate.studentId}) 
                .update(updateObject);

            if (updatedRowCount) {
                console.log('Update completed');
                return { code: 201, status: 'success', message: 'student profile updated'};
            }

            return updatedRow;
        } catch(err) {
            console.log('Updating student failed');
        }
    }

    return { code: 400, status: 'failed', message: 'no student profile to updated' };
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
    retrieveAllStudents,
    deleteStudent,
    updateStudent,
};