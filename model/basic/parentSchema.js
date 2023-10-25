const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const getDBConnection = require('../model-utils/schemaUtils').getDBConnection;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;


const parentSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('parents');

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('parents', (table) => { 
                        table.primary(['id', 'parent_id']); 
                        table.increments('id'); 
                        table.string('parent_id').notNullable();      
                        table.string('first_name').notNullable();
                        table.string('last_name').notNullable();
                        table.bigint('phone').notNullable(); // confirm given data type is appropriate                 // change this to date
                        table.string('email');
                        table.string('photo_url');           // consider using url here or

                        console.log('Parents Schema setup successful');    
                    });
                await makeFieldUnique('parents', 'parent_id');
                console.log('control got here...');
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing parent-schema found, no need to create another');
        }                
    }
};


module.exports = {
    parentSchema,
};
