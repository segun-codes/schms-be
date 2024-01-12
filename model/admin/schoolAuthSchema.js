const isTableExist = require('../model-utils/schemaUtils').isTableExist;



/**
 *  This schema is for the table that stores school IDs and their token  
 *  @conn required to support testing only
 */

const schoolAuthSchema = async (mysqlConn) => { 
    if (mysqlConn) {
        console.log('MySQL DB Connected');

        const tableExists = await isTableExist('schoolAuths', mysqlConn);
        //console.log('...tableExists: ', tableExists);

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('schoolAuths', (table) => { 
                        table.uuid('sch_auth_id', {primaryKey: true}).defaultTo(mysqlConn.fn.uuid());  
                        table.string('sch_id').notNullable();     
                        table.string('auth_token').notNullable();   
                    });

            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing schoolAuth-schema found, no need to create another');
        }                
    }
};



module.exports = {
    schoolAuthSchema,
};
