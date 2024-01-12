//const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;
//const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;


const classroomSchema = async (conn) => { 
    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('classrooms', conn);

        if (!tableExists) {
            try {
                await conn.schema
                    .createTable('classrooms', (table) => { 
                        table.primary(['class_id']); 
                        table.string('class_id').notNullable();      
                        table.string('class_name').notNullable(); 
                        table.string('purpose').notNullable(); 
                        table.string('period_of_use');    // data type to be reviewed     

                        console.log('classrooms schema setup successful');    
                    });
                
                await makeFieldUnique('classrooms', 'class_id', conn); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing classroom schema found, no need to create another');
        }                
    } else {
        console.log('DB connection handle missing');
    }
};


module.exports = {
    classroomSchema,
};
