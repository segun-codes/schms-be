const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const employeeSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('employees');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('employees', (table) => { 
                        table.primary(['emp_id']);  
                        table.bigint('emp_id').notNullable(); // change data type this to equivalent of long      
                        table.string('first_name').notNullable(); // accepts "first", "second", "third" (i.e., first-term, second-term and third-term) - limit what valuable than can be entered here???
                        table.string('middle_name').notNullable(); 
                        table.string('last_name').notNullable(); // eventually this should be extracted from "academic_sessions" table
                        table.date('dob').notNullable(); 
                        table.string('photo_url').notNullable(); 
                        table.date('employment_date').notNullable(); 
                        table.string('status_of_employment').notNullable(); // values: active, exited 
                        table.string('role').notNullable(); // possible values: hod, head-teacher, teacher, minder, admin, cleaner, assistant  
                        table.string('phone_no').notNullable(); 
                        table.string('email').notNullable(); 
                        table.string('address_id').notNullable();         

                        console.log('employee schema setup successful');    
                    });

                await makeFieldUnique('employees', ['first_name', 'last_name', 'middle_name']); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing employee-schema found, no need to create another');
        }                
    }
};


module.exports = {
    employeeSchema,
};
