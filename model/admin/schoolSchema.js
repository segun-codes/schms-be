let mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


/**
 *  This schema is for the table that stores top-level information about each client (i.e., a school)  
 *  @conn required to support testing only
 */

const schoolSchema = async (conn = null) => { 

    if (conn) {
        mysqlConn = conn;
    }

    if (mysqlConn) {
        console.log('MySQL DB Connected');

        const tableExists = conn !== null ? await isTableExist('schools', conn) : await isTableExist('schools');
        //console.log('...tableExists: ', tableExists);

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('schools', (table) => { 
                        table.primary(['sch_id']); 
                        table.increments('sch_id');  
                        table.string('name').notNullable();
                        table.string('name_acronym').notNullable();      //must be three letter e.g., NFL - For Nafowa Little Angels School     
                        table.string('type').notNullable();              //possible values: nursery, nurs_primary, nurs_primary_secondary, secondary   
                        table.string('address').notNullable();  
                        table.integer('last_student_no');    // used to track student number already issued out  
                        table.integer('last_employee_no');   // used to track employee number already issued out  
                        table.integer('last_parent_no');     // used to track parent number already issued out
                        table.integer('last_address_no');    // used to track parent number already issued out
                        table.integer('last_classroom_no');  // place value 0 - 0000 
                        table.integer('last_curriculum_no');
                        // table.string('last_session_year');      // in format YYYY-YYYY (e.g., 2020-2021)
                        // table.string('last_subject_no');
                        // table.string('last_term_no');
                        table.bigint('client_id'); 
                        console.log('schools schema setup successful');    
                    });
                
                await makeFieldUnique('schools', 'name', mysqlConn); // I want two fields to be unique across multiple rows, how to do this
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing school-schema found, no need to create another');
        }                
    }
};



module.exports = {
    schoolSchema,
};
