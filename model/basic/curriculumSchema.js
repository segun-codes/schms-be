const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;


const curriculumSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('curricula');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('curricula', (table) => { 
                        table.primary(['id', 'curriculum_id']); 
                        table.increments('id'); 
                        table.integer('curriculum_id').notNullable(); // curriculum id, starts from 1001, 1002, 1003...etc
                        table.integer('week_no').notNullable(); // e.g., curriculum organizes teachings into week 1, week 2... week 12; possible values: 1, 2, 3
                        table.string('topic').notNullable();
                        table.string('objective').notNullable();
                        table.string('details').notNullable();
                        table.string('comment').notNullable();        

                        console.log('Curriculum schema setup successful');    
                    });

                await makeFieldUnique('curricula', 'curriculum_id');
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing Curriculum schema found, no need to create another');
        }                
    }
};


module.exports = {
    curriculumSchema
};
