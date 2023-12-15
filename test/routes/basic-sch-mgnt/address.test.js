const request = require('supertest');
const schmsApp = require('../../../app');
const { schData1 } = require('../../utils-test');
const mysqlConn = require('../../../utils/dbConnection').mysqlConnTest;
const schoolSchema = require('../../../model/admin/schoolSchema').schoolSchema;


/**
 * Mockup backend not used since it inexpensive to test real endpoints
 * Mockup backend will be used when necessary
 */
describe('GET /addressId', () => {
    const schoolTable = 'schools';

    // setup "schools" table
    beforeAll(async () => {         
        await schoolSchema(mysqlConn);
        await mysqlConn(schoolTable).insert(schData1);
    });

    // drop table and close db connection handle
    afterAll(async () => {
        await mysqlConn.schema.dropTable('addresses');
        await mysqlConn.schema.dropTable(schoolTable);
        await mysqlConn.destroy();
        console.log('Inside address.test: tables schools and address dropped; DB connection handle destroyed...');
    });

    //1.
    it('should should create address', async () => {
        const address1 = {
            apiKey: '24RTZY5678PPY568WRESXT34FTR',
            empId: 1002,
            houseNo: 2,
            streetLineOne: '132 Atinsola Str.',
            streetLineTwo: 'Night Road',
            townCity: 'Waterloo',
            stateRegion: 'Ontario',
            country: 'Canada', 
            postCode: 10221
        };

        const response = await request(schmsApp).post('/api/v1/addresses/').send(address1);
        expect(response.res.statusCode).toEqual(201);
    });

    //1.
    // it('should produce correct response code', async () => {
    //     const response = await request(schmsApp).get('/api/v1/schools/1');
    //     expect(response.statusCode).toEqual(200);
    // });

    // //2.
    // it('should produce correct number of schools added', async () => {
    //     await mysqlConn(tableName).insert(schData2);

    //     const response = await request(schmsApp).get('/api/v1/schools/');
    //     const schoolCount = response._body.payload.length;
    //     expect(schoolCount).toEqual(2);
    // });

    // //4. 
    // it('should return http code for create', async () => {
    //     const response = await request(schmsApp).patch('/api/v1/schools/').send(schData4);
    //     expect(response.res.statusCode).toEqual(201);
    // });

    // //5.
    // it('should produce correct response code', async () => {
    //     const response = await request(schmsApp).delete('/api/v1/schools/1');
    //     expect(response.statusCode).toEqual(200);
    // });
});


