const request = require('supertest');
const schmsApp = require('../../../app');
const { schData } = require('../../utils-test');
const mysqlConn = require('../../../utils/dbConnection').mysqlConnTest;
const schoolSchema = require('../../../model/admin/schoolSchema').schoolSchema;


//1.
describe('GET /schoolId', () => {
    const tableName = 'schools';

    // setup "schools" table
    beforeAll(async () => {         
        await schoolSchema(mysqlConn);
        await mysqlConn(tableName).insert(schData);
    });

    // drop table and close db connection handle
    afterAll(async () => {
        await mysqlConn.schema.dropTable(tableName);
        await mysqlConn.destroy();
        console.log('Inside school.test: DB connection handle destroyed...');
    });

    // WORKING
    // it('responds with json', () => {
    //     request(schmsApp)
    //         .get('/1') //'/:schoolId'
    //         //.expect('Content-Type', 'text/html; charset=utf-8')
    //         .expect('Content-Type', 'application/json')
    //         .expect(200)
    //         .end(function (err, res) {
    //             console.log('err: ', err);
    //         });
    // });

    // 
    // it('responds with json', async function() {
    //     const response = await request(schmsApp)
    //     .get('/1')
    //     .expect('Content-Type', 'text/html; charset=utf-8');
    //     //.set('Accept', 'application/json');

    //     //console.log('response', response);
    //     //expect(response.headers["Content-Type"]).toMatch(/json/);
    //     expect(response.status).toEqual(200);
    //     //expect(response.body.email).toEqual('foo@bar.com');
    // });
});


