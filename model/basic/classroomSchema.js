const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const classroomSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('classrooms');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('classrooms', (table) => { 
                        table.primary(['id', 'class_id']); 
                        table.increments('id'); 
                        table.string('class_id').notNullable();      
                        table.string('class_name').notNullable(); 
                        table.string('purpose').notNullable(); 
                        table.string('period_of_use');         

                        console.log('classrooms schema setup successful');    
                    });
                
                await makeFieldUnique('classrooms', 'class_id'); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing classroom schema found, no need to create another');
        }                
    }
};


module.exports = {
    classroomSchema,
};
