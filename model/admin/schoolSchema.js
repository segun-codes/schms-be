const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;



const schoolSchema = async (mysqlConn) => { 
    if (mysqlConn) {
        console.log('MySQL DB Connected');

        const tableExists = await isTableExist('schools', mysqlConn);

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('schools', (table) => { 
                        table.uuid('sch_id', {primaryKey: true}).defaultTo(mysqlConn.fn.uuid());  
                        table.string('name').checkLength('>=', 15);     
                        table.string('name_acronym').checkLength('=', 3);
                        table.string('type').checkIn(['nursery', 'nurs_primary', 'primary', 'nurs_primary_secondary', 'secondary'], 'checkType'); 
                        table.string('address').checkLength('>=', 7); 
                        table.string('username').checkLength('>=', 5);
                        table.string('password').checkLength('>=', 8);
                        table.string('phone_no_1').notNullable();
                        table.string('phone_no_2').notNullable();
                        table.string('email').notNullable();      
                        table.integer('last_student_no');    // used to track student number already issued out  
                        table.integer('last_employee_no');   // used to track employee number already issued out  
                        table.integer('last_parent_no');     // used to track parent number already issued out
                        table.integer('last_address_no');    // used to track parent number already issued out
                        table.integer('last_classroom_no');  // place value 0 - 0000 
                        //table.integer('last_curriculum_no');
                        // table.string('last_session_year');      // in format YYYY-YYYY (e.g., 2020-2021)
                        // table.string('last_subject_no');
                        // table.string('last_term_no');
                        table.bigint('client_id');    // 
                        table.binary('profile_pix');
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
