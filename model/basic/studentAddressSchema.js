const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const studentAddressSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('student_addresses');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('student_addresses', (table) => { 
                        table.primary(['id', 'std_address_id']); 
                        table.increments('id'); 
                        table.string('std_address_id').notNullable();
                        table.string('student_id').notNullable();
                        table.integer('house_no').notNullable(); 
                        table.string('street_line_one').notNullable();
                        table.string('street_line_two').notNullable();  
                        table.string('town_city').notNullable(); 
                        table.string('state_region').notNullable();
                        table.string('country').notNullable();
                        table.string('post_code');  // change this to the equivalent of data type "long" supported by knexjs         

                        console.log('student address schema setup successful');    
                    });
                await makeFieldUnique('student_addresses', 'std_address_id'); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing student-address schema found, no need to create another');
        }                
    }
};


module.exports = {
    studentAddressSchema,
};
