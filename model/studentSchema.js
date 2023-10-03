const mysqlConn = require('../utils/dbConnection').mysqlConn;
const isTableExist = require('./schemaUtils').isTableExist;
const getDBConnection = require('./schemaUtils').getDBConnection;
const makeStudentIdUnique = require('./schemaUtils').makeStudentIdUnique;


const studentSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('students');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('students', (table) => { 
                        table.primary(['id', 'student_id']); 
                        table.increments('id'); 
                        table.string('student_id').notNullable();      
                        table.string('first_name').notNullable();
                        table.string('middle_name').notNullable();
                        table.string('last_name').notNullable();
                        table.string('dob').notNullable();                 // change this to date 
                        table.string('photo_url').notNullable();           // consider using url here or
                        table.date('date_of_first_resumpt').notNullable(); // use date data type later  
                        table.date('grad_date').notNullable();             // use date data type later
                        table.string('status').notNullable();              // three possibilites - active, graduated, exited; "exited" means student left the school without completing program) 
                        table.string('curr_teacher_id').notNullable();
                        table.string('parent_id').notNullable();         

                        console.log('Schema setup successful');    
                    });
                await makeStudentIdUnique('students', 'student_id');
                console.log('control got here...');
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing schema found, no need to create another');
        }                
    }
};


module.exports = {
    studentSchema,
};
