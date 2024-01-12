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
const schoolAuthSchema = require('../admin/schoolAuthSchema').schoolAuthSchema;

const setUpSchema = async (tableName, conn) => {
    try {
        switch(tableName) {
            case 'school_terms': 
                await termSchema(conn);
                break; 
            case 'academic_sessions': 
                await sessionSchema(conn);
                break;
            case 'students': 
                await studentSchema(conn);
                break; 
            case 'employees': 
                await employeeSchema(conn);
                break;
            case 'subjects': 
                await subjectSchema(conn);
                break; 
            case 'curricula': 
                await curriculumSchema(conn);
                break; 
            case 'classrooms': 
                await classroomSchema(conn);
                break; 
            case 'addresses': 
                await addressSchema(conn);
                break;
            case 'parents':
                await parentSchema(conn);
                break; 
            case 'schools':
                await schoolSchema(conn);
                break; 
            case 'schoolAuths':
                await schoolAuthSchema(conn);
                break; 
        }
    } catch(err) {
        console.log(`${tableName} setup failed`);
        console.log(err.sqlMessage);
    }
};

module.exports = {
    setUpSchema
};
