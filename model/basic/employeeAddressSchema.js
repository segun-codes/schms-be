const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const employeeAddressSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('employee_addresses');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('employee_addresses', (table) => { 
                        table.primary(['id', 'emp_address_id']); 
                        table.increments('id'); 
                        table.string('emp_address_id').notNullable();
                        table.string('emp_id').notNullable();
                        table.integer('house_no').notNullable(); 
                        table.string('street_line_one').notNullable();
                        table.string('street_line_two').notNullable();  
                        table.string('town_city').notNullable(); 
                        table.string('state_region').notNullable();
                        table.string('country').notNullable();
                        table.string('post_code');  // change this to the equivalent of data type "long" supported by knexjs         

                        console.log('employee address schema setup successful');    
                    });
                await makeFieldUnique('employee_addresses', 'emp_address_id'); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing employee-address schema found, no need to create another');
        }                
    }
};


module.exports = {
    employeeAddressSchema,
};
