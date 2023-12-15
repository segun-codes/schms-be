const isTableExist = require('../model-utils/schemaUtils').isTableExist;
const makeFieldUnique = require('../model-utils/schemaUtils').makeFieldUnique;



const addressSchema = async (conn) => {

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist('addresses', conn);

        if (!tableExists) {
            try {
                await conn.schema
                    .createTable('addresses', (table) => { 
                        table.primary(['address_id']); 
                        table.integer('address_id').notNullable();
                        table.integer('emp_id').nullable();
                        table.string('student_id').nullable();
                        table.integer('house_no').notNullable(); 
                        table.string('street_line_one').notNullable();
                        table.string('street_line_two').notNullable();  
                        table.string('town_city').notNullable(); 
                        table.string('state_region').notNullable();
                        table.string('country').notNullable();
                        table.string('post_code');  // change this to the equivalent of data type "long" supported by knexjs         

                        console.log('address schema setup successful');    
                    });
                await makeFieldUnique('addresses', 'address_id', conn); 
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing address schema found, no need to create another');
        }                
    }
};


// const addressSchema = async () => { 
//     const conn = await getDBConnection();

//     if (conn) {
//         console.log('MySQL DB Connected');
        
//         const tableExists = await isTableExist('addresses');

//         if (!tableExists) {
//             try {
//                 await mysqlConn.schema
//                     .createTable('addresses', (table) => { 
//                         table.primary(['address_id']); 
//                         table.integer('address_id').notNullable();
//                         table.integer('emp_id').nullable();
//                         table.string('student_id').nullable();
//                         table.integer('house_no').notNullable(); 
//                         table.string('street_line_one').notNullable();
//                         table.string('street_line_two').notNullable();  
//                         table.string('town_city').notNullable(); 
//                         table.string('state_region').notNullable();
//                         table.string('country').notNullable();
//                         table.string('post_code');  // change this to the equivalent of data type "long" supported by knexjs         

//                         console.log('address schema setup successful');    
//                     });
//                 await makeFieldUnique('addresses', 'address_id'); 
//             } catch(err) {
//                 throw err;
//             }
//         } else {
//             console.log('Existing address schema found, no need to create another');
//         }                
//     }
// };


module.exports = {
    addressSchema
};
