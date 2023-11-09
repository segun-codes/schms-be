const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;


const studentSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('students');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('students', (table) => { 
                        table.primary(['student_id']); 
                        table.string('student_id').notNullable();      
                        table.string('first_name').notNullable();
                        table.string('middle_name').notNullable();
                        table.string('last_name').notNullable();
                        table.string('dob').notNullable();                 // change this to date
                        table.string('genotype').nullable();
                        table.string('blood_group').nullable(); 
                        table.string('photo_url').notNullable();           // consider using url here or
                        table.string('address_id').notNullable();
                        table.date('date_of_first_resumpt').notNullable(); // use date data type later  
                        table.date('expected_grad_date').notNullable();             // use date data type later
                        table.string('status').notNullable();              // three possibilites - active, graduated, exited; "exited" means student left the school without completing program) 
                        table.string('class_id').notNullable();
                        table.string('teacher_id');     // equivalent to staff_id for a teacher
                        table.string('minder_id');  
                        table.string('parent_id').notNullable();         

                        console.log('Students Schema setup successful');    
                    });
                await makeFieldUnique('students', ['first_name', 'middle_name', 'last_name']);
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing student-schema found, no need to create another');
        }                
    }
};


module.exports = {
    studentSchema,
};
