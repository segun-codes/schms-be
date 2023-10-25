const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;


const sessionSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('academic_sessions');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('academic_sessions', (table) => { 
                        table.primary(['id', 'session_year']); 
                        table.increments('id');     
                        table.string('session_name').notNullable();
                        table.string('session_year').notNullable();
                        table.string('comment').notNullable();         

                        console.log('Session schema setup successful');    
                    });

                await makeFieldUnique('academic_sessions', 'session_year');
                console.log('control got here...');

            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing sch-schema found, no need to create another');
        }                
    }
};


module.exports = {
    sessionSchema,
};
