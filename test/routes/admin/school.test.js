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

    it('responds with json', async () => {
        const response = await request(schmsApp).get('/api/v1/schools/1');
        expect(response.statusCode).toEqual(200);
    });
});


