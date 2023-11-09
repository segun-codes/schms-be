const termSchema = require('../basic/termSchema').termSchema;
const sessionSchema = require('../basic/sessionSchema').sessionSchema;
const studentSchema = require('../basic/studentSchema').studentSchema;
const subjectSchema = require('../basic/subjectSchema').subjectSchema;
const curriculumSchema = require('../basic/curriculumSchema').curriculumSchema;
const classroomSchema = require('../basic/classroomSchema').classroomSchema;
const addressSchema = require('../basic/addressSchema').addressSchema;
const parentSchema = require('../basic/parentSchema').parentSchema;
const employeeSchema = require('../basic/employeeSchema').employeeSchema;
const schoolSchema = require('../admin/schoolSchema').schoolSchema;

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
            case 'employees': 
                await employeeSchema();
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
            case 'addresses': 
                await addressSchema();
                break;
            case 'parents':
                await parentSchema();
                break; 
            case 'schools':
                await schoolSchema();
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
