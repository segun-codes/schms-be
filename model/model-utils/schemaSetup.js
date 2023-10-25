const termSchema = require('../basic/termSchema').termSchema;
const sessionSchema = require('../basic/sessionSchema').sessionSchema;
const studentSchema = require('../basic/studentSchema').studentSchema;
const subjectSchema = require('../basic/subjectSchema').subjectSchema;
const curriculumSchema = require('../basic/curriculumSchema').curriculumSchema;
const classroomSchema = require('../basic/classroomSchema').classroomSchema;
const studentAddressSchema = require('../basic/studentAddressSchema').studentAddressSchema;
const employeeAddressSchema = require('../basic/employeeAddressSchema').employeeAddressSchema;
const parentSchema = require('../basic/parentSchema').parentSchema;
// classroomSchema


const setUpSchema = async (tableName) => {
    try {
        switch(tableName) {
            case 'school_terms': 
                await termSchema();
                break; 
            case 'academic_sessions': 
                await sessionSchema();
                break;
            case 'students': 
                await studentSchema();
                break; 
            case 'subjects': 
                await subjectSchema();
                break; 
            case 'curricula': 
                await curriculumSchema();
                break; 
            case 'classrooms': 
                await classroomSchema();
                break; 
            case 'student_addresses': 
                await studentAddressSchema();
                break;
            case 'employee_addresses': 
                await employeeAddressSchema();
                break;
            case 'parents':
                await parentSchema();
                break; 
        }
    } catch(err) {
        console.log(`${tableName} setup failed`);
        console.log(err);
    }
};

module.exports = {
    setUpSchema
};
