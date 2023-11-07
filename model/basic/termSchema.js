const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const termSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('school_terms');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('school_terms', (table) => { 
                        table.primary(['term_id']); // can only be 1, 2 or 3 for now
                        table.increments('term_id');      
                        table.string('term').notNullable(); // accepts "first", "second", "third" (i.e., first-term, second-term and third-term) - limit what valuable than can be entered here???
                        table.string('session_year').notNullable(); // eventually this should be extracted from "academic_sessions" table
                        table.string('comment').notNullable();         

                        console.log('terms schema setup successful');    
                    });
                
                await makeFieldUnique('school_terms', ['term', 'session_year']); // I want two fields to be unique across multiple rows, how to do this
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing term-schema found, no need to create another');
        }                
    }
};


module.exports = {
    termSchema,
};
