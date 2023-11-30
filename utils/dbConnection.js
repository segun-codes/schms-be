const knex = require('knex');
const { devConfig, testConfig } = require('../config/dbConfig');



const devConnection = { 
    host: devConfig.HOST, port: devConfig.PORT, user: devConfig.USER, 
    password: devConfig.PASSWORD, database: devConfig.DATABASE 
};

const testConnection = { 
    host: testConfig.HOST, port: testConfig.PORT, user: testConfig.USER, 
    password: testConfig.PASSWORD, database: testConfig.DATABASE 
};

const mysqlConn = knex({
    client: devConfig.CLIENT,
    connection: devConnection,
    pool: {
        min: 0,
        max: 7,
    }
});

const mysqlConnTest = knex({
    client: testConfig.CLIENT,
    connection: testConnection,
    pool: {
        min: 0,
        max: 7,
    }
});



module.exports = {
    mysqlConn,
    mysqlConnTest
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