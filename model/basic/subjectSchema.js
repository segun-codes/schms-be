const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;


const subjectSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('subjects');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('subjects', (table) => { 
                        table.primary(['id', 'subject_id']); 
                        table.increments('id');
                        table.string('subject_id').notNullable();  
                        table.integer('curriculum_id').notNullable(); // curriculum id
                        table.string('name').notNullable();
                        table.string('description').notNullable();
                        table.string('objective').notNullable();
                        table.string('level').notNullable();  // what class is it suitable for       

                        console.log('Subject schema setup successful');    
                    });

                await makeFieldUnique('subjects', 'curriculum_id');
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing subject schema found, no need to create another');
        }                
    }
};


module.exports = {
    subjectSchema
};
