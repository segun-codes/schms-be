const config = require('../config/dbConfig');

const knex = require('knex');

const mysqlConn = knex({
    client: config.CLIENT,
    connection: {
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE
    },
    pool: {
        min: 0,
        max: 7,
    }
});

module.exports = {
    mysqlConn
}
















// const dbAndSchemaSetup = async () => {
//     const knex = require('knex')({
//         client: 'mysql2',
//         connection: {
//             host: config.HOST, //'localhost'
//             port: config.PORT,
//             user: config.USER,
//             password: config.PASSWORD,
//             database: config.DATABASE
//         },
//         debug: true
//     });
    
//     try {
//         await knex.select(knex.raw('1'));
//         console.log('MySQL DB Connected');
//     } catch(err) {
//         console.log('Connection to db failed');
//     }

//     try {
//         await knex.schema
//             .createTable('students', (table) => {
//                 table.increments('id');
//                 table.string('first_name');
//                 console.log('Data schema setup complete');  
//             });
//     } catch(e) {
//         console.log('Crash test: schema also failed');
//     }
// }

// module.exports = {
//     dbAndSchemaSetup
// }